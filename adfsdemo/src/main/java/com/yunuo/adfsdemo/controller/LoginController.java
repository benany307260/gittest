package com.yunuo.adfsdemo.controller;

import java.net.URLEncoder;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


@Controller
public class LoginController {

	/**
	 * 跳转到登录页面
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/login.aspx")
    public String toLogin(HttpServletRequest request, Model model) throws Exception 
	{
		// AppID
		String a = request.getParameter("a");
		// 登录成功后返回的Url地址
		String r = request.getParameter("r");
		
/*    	Object tokenObj = request.getSession().getAttribute(SystemContent.LOGIN_TOKEN_NAME);
    	// session中已经有token，表示已经登录，直接跳转回调地址，并传token
    	if(tokenObj != null) 
    	{
    		String token = tokenObj.toString();
    		model.addAttribute("Token", token);
    		return "redirect:"+r;
    	}
*/		
    	// 未登录，跳转到登录页面
		
    	// 传参给页面
		model.addAttribute("AppID",a);
        model.addAttribute("returnUrl", r);
        
        return "/front/dist/login";
	}
	
	/**
	 * 登录
	 * @param request
	 * @param model
	 * @return
	 */
    @RequestMapping("/login")
    public String login(HttpServletRequest request, HttpServletResponse response, RedirectAttributes model) {
    	
		String username = request.getParameter("UserName");
		String password = request.getParameter("Password");
		
		String appID = request.getParameter("AppID");
		String returnUrl = request.getParameter("returnUrl");
		
		String tokenTime = Long.toString(System.currentTimeMillis());
		
		AccountInfo accountInfo = new AccountInfo();
		accountInfo.setEmployeeID(username);
		accountInfo.setAccount(username);
		accountInfo.setEmail(username);
		accountInfo.setName(username);
		accountInfo.setTokenTime(tokenTime);
		
		// 生成token
		String tokenStr = username + password + appID + returnUrl + String.valueOf(System.currentTimeMillis());
		String token = DigestUtils.md5DigestAsHex(tokenStr.getBytes());
		
		LoginInfo loginInfo = new LoginInfo();
		loginInfo.setUserName(username);
		loginInfo.setPassword(password);
		loginInfo.setAppID(appID);
		loginInfo.setReturnUrl(returnUrl);
		loginInfo.setToken(token);
		loginInfo.setTokenTime(tokenTime);
		loginInfo.setAccountInfo(accountInfo);
		
		OnlineInfo.LoginInfoMap.put(token, loginInfo);
	
		addCookie("Token", token, response);
    	// 跳回登录页面
    	return "/front/dist/login";
    }
    
	/**
	 * 登录
	 * @param request
	 * @param model
	 * @return
	 */
    @RequestMapping("/loginWithToken")
    public String loginWithToken(HttpServletRequest request, RedirectAttributes model) {
    	
    	String appID = request.getParameter("AppID");
    	String returnUrl = request.getParameter("returnUrl");
    	
    	String token = request.getParameter("Token");
    	// 没传token，跳回登录页
    	if(token == null || token.trim().length() < 1)
    	{
    		// 传参给页面
    		model.addAttribute("AppID",appID);
            model.addAttribute("returnUrl", returnUrl);
            return "/front/dist/login";
    	}
    	
    	// 传了token，取出token的用户信息
    	LoginInfo loginInfo = OnlineInfo.LoginInfoMap.get(token);
    	// 没拿到用户信息，跳回登录页面
    	if(loginInfo == null)
    	{
    		// 传参给页面
    		model.addAttribute("AppID",appID);
            model.addAttribute("returnUrl", returnUrl);
            return "/front/dist/login";
    	}

    	returnUrl = loginInfo.getReturnUrl();
    	
    	// 回调时把token传过去
    	model.addAttribute("Token", token);
    	// 回调给应用
        return "redirect:"+returnUrl;
    }
    
    /**
     * 跳转到登出页面
     * @param request
     * @param model
     * @return
     * @throws Exception
     */
	@RequestMapping("/logout.aspx")
    public String toLogout(HttpServletRequest request, Model model) throws Exception 
	{
		/*Object tokenObj = request.getSession().getAttribute(SystemContent.LOGIN_TOKEN_NAME);
    	// session中已经有token，移除掉内存map里的
    	if(tokenObj != null) 
    	{
    		String token = tokenObj.toString();
    		OnlineInfo.onlineUserMap.remove(token);
    	}
		
		request.getSession().removeAttribute(SystemContent.LOGIN_TOKEN_NAME);
		// 失效session
		request.getSession().invalidate();*/
		
        return "/front/dist/logout";
	}
	
    /**
     * 跳转到登出页面
     * @param request
     * @param model
     * @return
     * @throws Exception
     */
	@RequestMapping("/logout")
    public String logout(HttpServletRequest request, Model model) throws Exception 
	{
		String token = request.getParameter("Token");
    	// 有token，移除掉
    	if(token != null && token.trim().length() > 0)
    	{
    		OnlineInfo.LoginInfoMap.remove(token);
    	}
		
        return "/front/dist/logout";
	}
    
	/**
	 * 创建cookie，并将新cookie添加到“响应对象”response中
	 * @param name
	 * @param value
	 * @param response
	 */
	public void addCookie(String name, String value, HttpServletResponse response) 
	{
		try 
		{
			String encodeValue = URLEncoder.encode(value, "utf-8");
			
			// 创建新cookie
			Cookie cookie = new Cookie(name, encodeValue);
			// 设置存在时间为5分钟
			// cookie.setMaxAge(5 * 60);
			// 设置作用域
			// cookie.setPath("/");
			// 将cookie添加到response的cookie数组中返回给客户端
			response.addCookie(cookie);
		} 
		catch (Exception e) 
		{
			e.printStackTrace();
		}
	}
	
}
