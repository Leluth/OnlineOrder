package com.ssxu.onlineOrder.service;

import com.ssxu.onlineOrder.dao.CartDao;
import com.ssxu.onlineOrder.entity.Cart;
import com.ssxu.onlineOrder.entity.Customer;
import com.ssxu.onlineOrder.entity.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

/**
 * @author Shaoshuai Xu
 * @version 1.0
 * @description: CartService
 * @date 2021/10/16 15:24
 */


@Service
public class CartService {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private CartDao cartDao;

    public Cart getCart() {
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();
        Customer customer = customerService.getCustomer(username);

        if (customer != null) {
            Cart cart = customer.getCart();
            BigDecimal totalPrice = new BigDecimal("0");
            for (OrderItem item : cart.getOrderItemList()) {
                double currentPrice = item.getPrice() * item.getQuantity();
                totalPrice = totalPrice.add(new BigDecimal(Double.toString(currentPrice)));
            }
            cart.setTotalPrice(totalPrice.doubleValue());
            return cart;
        }
        return new Cart();
    }

    public void cleanCart() {
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();
        Customer customer = customerService.getCustomer(username);
        if (customer != null) {
            cartDao.removeAllCartItems(customer.getCart());
        }
    }
}
