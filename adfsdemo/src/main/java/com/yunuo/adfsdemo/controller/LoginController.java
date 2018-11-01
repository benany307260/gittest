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
	
/*	@RequestMapping("/GetAccInfo.aspx")
    public String getAccInfo(HttpServletRequest request, Model model) throws Exception 
	{
		String content = "{\"Account\":\"user1@infinitusportaltest.com\",\"Name\":\"user\",\"TokenTime\":\"201605251052542\"}";
		
		String appKey = "8773AAD318276EE8D8B3D01C1C8CA4665D80C132413E8292";
	
		String token = request.getParameter("Token");
		
		ADFSSecurityUtil securityUtil = ADFSSecurityUtil.of(appKey);
        String decrypt = securityUtil.encrypt(token, content);
		
        return decrypt;
	}*/
    
    
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
    public String login(HttpServletRequest request, RedirectAttributes model) {
    	
    	String AppID = request.getParameter("AppID");
    	String returnUrl = request.getParameter("returnUrl");
    	
    	String curTimeStr = String.valueOf(System.currentTimeMillis());
    	String token = DigestUtils.md5DigestAsHex(curTimeStr.getBytes());
    	model.addAttribute("Token", token);
    	
        return "redirect:"+returnUrl;
    }
    
    /*@RequestMapping("/sso")
    public String sso() {
        return "redirect:" + prefixUrl;
    }*/
    
}
