package com.ssxu.onlineOrder.controller;

import com.ssxu.onlineOrder.service.CartService;
import com.ssxu.onlineOrder.service.ItemOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author Shaoshuai Xu
 * @version 1.0
 * @description: ItemOrderController
 * @date 2021/10/9 12:38
 */
@Controller
public class ItemOrderController {

    @Autowired
    private ItemOrderService itemOrderService;

    @Autowired
    private CartService cartService;

    @RequestMapping(value = "/order/add/{menuId}", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.CREATED)
    public void addMenuItemToCart(@PathVariable int menuId) {
        itemOrderService.saveItem(menuId);
    }

    @RequestMapping(value = "/order/delete/{cartItemId}", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public void deleteItemFromCart(@PathVariable int cartItemId) {
        cartService.deleteItemFromCart(cartItemId);
    }
}
