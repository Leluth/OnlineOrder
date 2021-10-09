package com.ssxu.onlineOrder.service;

import com.ssxu.onlineOrder.dao.CustomerDao;
import com.ssxu.onlineOrder.entity.Cart;
import com.ssxu.onlineOrder.entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author Shaoshuai Xu
 * @version 1.0
 * @description: CustomerService
 * @date 2021/9/29 20:32
 */
@Service
public class CustomerService {

    @Autowired
    private CustomerDao customerDao;

    public void signUp(Customer customer) {
        Cart cart = new Cart();
        customer.setCart(cart);

        customer.setEnabled(true);
        customerDao.signUp(customer);
    }

    public Customer getCustomer(String email) {
        return customerDao.getCustomer(email);
    }
}

