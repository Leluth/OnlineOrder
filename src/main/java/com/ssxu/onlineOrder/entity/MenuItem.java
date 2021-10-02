package com.ssxu.onlineOrder.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * @author Shaoshuai Xu
 * @version 1.0
 * @description: MenuItem
 * @date 2021/10/2 15:29
 */

@Entity
@Table(name = "menuitem")
public class MenuItem implements Serializable {

    private static final long serialVersionUID = 7551999649936522523L;

    @Id
    private int id;

    private String name;

    private String description;

    private double price;

    private String imageUrl;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
