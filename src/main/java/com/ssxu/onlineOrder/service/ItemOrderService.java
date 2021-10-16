package com.ssxu.onlineOrder.service;

import com.ssxu.onlineOrder.dao.ItemOrderDao;
import com.ssxu.onlineOrder.entity.Customer;
import com.ssxu.onlineOrder.entity.MenuItem;
import com.ssxu.onlineOrder.entity.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

/**
 * @author Shaoshuai Xu
 * @version 1.0
 * @description: ItemOrderService
 * @date 2021/10/16 14:51
 */
@Service
public class ItemOrderService {

    @Autowired
    private MenuInfoService menuInfoService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private ItemOrderDao itemOrderDao;

    public void saveItem(int menuId) {
        final OrderItem orderItem = new OrderItem();
        // get MenuItem
        final MenuItem menuItem = menuInfoService.getMenuItem(menuId);
        // get current Customer
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();
        Customer customer = customerService.getCustomer(username);
        // package
        orderItem.setMenuItem(menuItem);
        orderItem.setCart(customer.getCart());
        orderItem.setQuantity(1);
        orderItem.setPrice(menuItem.getPrice());
        itemOrderDao.save(orderItem);
    }
}
