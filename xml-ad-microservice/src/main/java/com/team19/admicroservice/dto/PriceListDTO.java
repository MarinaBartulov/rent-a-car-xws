package com.team19.admicroservice.dto;

import com.team19.admicroservice.model.PriceList;

public class PriceListDTO {

    private Long id;
    private double pricePerKm;
    private double pricePerDay;
    private double priceForCdw;
    private int discount20Days;
    private int discount30Days;
    private String alias;

    public PriceListDTO()
    {

    }

    public PriceListDTO(PriceList priceList){
        this.id = priceList.getId();
        this.pricePerKm = priceList.getPricePerKm();
        this.pricePerDay = priceList.getPricePerDay();
        this.priceForCdw = priceList.getPriceForCdw();
        this.discount20Days = priceList.getDiscount20Days();
        this.discount30Days = priceList.getDiscount30Days();
        this.alias = priceList.getAlias();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getPricePerKm() {
        return pricePerKm;
    }

    public void setPricePerKm(double pricePerKm) {
        this.pricePerKm = pricePerKm;
    }

    public double getPricePerDay() {
        return pricePerDay;
    }

    public void setPricePerDay(double pricePerDay) {
        this.pricePerDay = pricePerDay;
    }

    public int getDiscount20Days() {
        return discount20Days;
    }

    public void setDiscount20Days(int discount20Days) {
        this.discount20Days = discount20Days;
    }

    public int getDiscount30Days() {
        return discount30Days;
    }

    public void setDiscount30Days(int discount30Days) {
        this.discount30Days = discount30Days;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public double getPriceForCdw() {
        return priceForCdw;
    }

    public void setPriceForCdw(double priceForCdw) {
        this.priceForCdw = priceForCdw;
    }
}
