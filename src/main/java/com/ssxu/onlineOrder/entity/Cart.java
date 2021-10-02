package com.ssxu.onlineOrder.entity;
import javax.persistence.*;
import java.io.Serializable;

/**
 * @author Shaoshuai Xu
 * @version 1.0
 * @description: Cart
 * @date 2021/10/2 15:27
 */
@Entity
@Table(name = "cart")
public class Cart implements Serializable {

    private static final long serialVersionUID = 8436097833452420298L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private double totalPrice;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }
}

