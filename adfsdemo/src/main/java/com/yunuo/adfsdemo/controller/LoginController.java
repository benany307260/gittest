package com.yunuo.adfsdemo.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/")
public class LoginController {

	@RequestMapping("/login.aspx")
    public String toLogin(HttpServletRequest request, Model model) throws Exception 
	{
		// AppID
    	String a = request.getParameter("a");
    	// 登录成功后返回的Url地址
    	String r = request.getParameter("r");
		
		model.addAttribute("AppID",a);
        model.addAttribute("returnUrl", r);
        
        return "/front/dist/index";
	}
    
    
    /*@RequestMapping("/toLogin")
    public String toLogin(HttpServletRequest request) 
    {
    	// AppID
    	String a = request.getParameter("a");
    	// 登录成功后返回的Url地址
    	String r = request.getParameter("r");
    	
        return "redirect:login.html";
    }*/
    
    @RequestMapping("/login")
    public String login(HttpServletRequest request, HttpServletResponse response) {
    	
        return "redirect:login.html";
    }
    
    /*@RequestMapping("/sso")
    public String sso() {
        return "redirect:" + prefixUrl;
    }*/
    
}
