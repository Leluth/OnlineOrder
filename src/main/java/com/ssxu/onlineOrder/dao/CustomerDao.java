package com.ssxu.onlineOrder.dao;

import com.ssxu.onlineOrder.entity.Customer;
import org.springframework.stereotype.Repository;

/**
 * @author Shaoshuai Xu
 * @version 1.0
 * @description: CustomerDao
 * @date 2021/9/29 20:30
 */
@Repository
public class CustomerDao {
    public void signUp(Customer customer) {
    }

    public Customer getCustomer(String email) {
        return new Customer();
    }

}
