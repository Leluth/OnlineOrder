package com.ssxu.onlineOrder.service;

import com.ssxu.onlineOrder.dao.MenuInfoDao;
import com.ssxu.onlineOrder.entity.MenuItem;
import com.ssxu.onlineOrder.entity.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Shaoshuai Xu
 * @version 1.0
 * @description: MenuInfoService
 * @date 2021/10/16 14:09
 */
@Service
public class MenuInfoService {
    @Autowired
    private MenuInfoDao menuInfoDao;

    public List<Restaurant> getRestaurants() {
        return menuInfoDao.getRestaurants();
    }

    public List<MenuItem> getAllMenuItem(int restaurantId) {
        return menuInfoDao.getAllMenuItem(restaurantId);
    }

    public MenuItem getMenuItem(int id) {
        return menuInfoDao.getMenuItem(id);
    }
}
