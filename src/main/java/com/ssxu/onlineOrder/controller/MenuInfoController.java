package com.ssxu.onlineOrder.controller;

import com.ssxu.onlineOrder.entity.MenuItem;
import com.ssxu.onlineOrder.entity.Restaurant;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

import java.util.List;

/**
 * @author Shaoshuai Xu
 * @version 1.0
 * @description: MenuInfoController
 * @date 2021/10/9 12:36
 */
@Controller
public class MenuInfoController {
    @RequestMapping(value = "/restaurant/{restaurantId}/menu", method = RequestMethod.GET)
    @ResponseBody
    public List<MenuItem> getMenus(@PathVariable("restaurantId") int restaurantId) {
        return new ArrayList<>();
    }

    @RequestMapping(value = "/restaurants", method = RequestMethod.GET)
    @ResponseBody
    public List<Restaurant> getRestaurants() {
        return new ArrayList<>();
    }
}
