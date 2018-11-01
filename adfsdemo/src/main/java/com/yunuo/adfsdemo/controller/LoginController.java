package com.yunuo.adfsdemo.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


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
	
	@RequestMapping("/logout.aspx")
    public String toLogout(HttpServletRequest request, Model model) throws Exception 
	{
		// AppID
    	String a = request.getParameter("a");
    	// 登录成功后返回的Url地址
    	String r = request.getParameter("r");
		
		model.addAttribute("AppID",a);
        model.addAttribute("returnUrl", r);
        
        return "/front/dist/index";
	}
	
    @RequestMapping("/login")
    public String login(HttpServletRequest request, RedirectAttributes model) {
    	
    	String username = request.getParameter("username");
    	String password = request.getParameter("password");
    	
    	String AppID = request.getParameter("AppID");
    	String returnUrl = request.getParameter("returnUrl");
    	
    	String curTimeStr = String.valueOf(System.currentTimeMillis());
    	String token = DigestUtils.md5DigestAsHex(curTimeStr.getBytes());
    	model.addAttribute("Token", token);
    	
    	AccountInfo accountInfo = new AccountInfo();
    	accountInfo.setEmployeeID(username);
    	accountInfo.setAccount(username);
    	accountInfo.setEmail(username);
    	accountInfo.setName(username);
    	accountInfo.setTokenTime(Long.toString(System.currentTimeMillis()));
    	OnlineInfo.onlineUserMap.put(token, accountInfo);
    	
        return "redirect:"+returnUrl;
    }
    
    
}
