package com.yunuo.adfsdemo.controller;

import java.io.Serializable;

public class AccountInfo implements Serializable
{
  /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
private String account;
  private String name;
  private String upn;
  private String tokenTime;
  private String employeeID;
  private String email;
  private String random;

  public String getAccount()
  {
    return this.account;
  }

  public void setAccount(String account) {
    this.account = account;
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getUpn() {
    return this.upn;
  }

  public void setUpn(String upn) {
    this.upn = upn;
  }

  public String getTokenTime() {
    return this.tokenTime;
  }

  public void setTokenTime(String tokenTime) {
    this.tokenTime = tokenTime;
  }

  public String getEmployeeID() {
    return this.employeeID;
  }

  public void setEmployeeID(String employeeID) {
    this.employeeID = employeeID;
  }

  public String getEmail() {
    return this.email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getRandom() {
    return this.random;
  }

  public void setRandom(String random) {
    this.random = random;
  }

  public String toString()
  {
    return "AccountInfo{account='" + this.account + '\'' + ", name='" + this.name + '\'' + ", upn='" + this.upn + '\'' + ", tokenTime='" + this.tokenTime + '\'' + ", employeeID='" + this.employeeID + '\'' + ", email='" + this.email + '\'' + ", random='" + this.random + '\'' + '}';
  }
}