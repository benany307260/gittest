package com.yunuo.adfsdemo.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;


@RestController
public class AccController {

	
	@RequestMapping("/GetAccInfo.aspx")
    public Object getAccInfo(HttpServletRequest request) throws Exception 
	{
		/*AccountInfo acc = new AccountInfo();
		acc.setAccount("0001146");
		acc.setName("甄珍珠");
		acc.setTokenTime(Long.toString(System.currentTimeMillis()));*/
		
		String token = request.getParameter("Token");
		
		AccountInfo accountInfo = OnlineInfo.onlineUserMap.get(token);
		
		String content = JSON.toJSONString(accountInfo);
		
		String appKey = "8773AAD318276EE8D8B3D01C1C8CA4665D80C132413E8292";
	
		
		ADFSSecurityUtil securityUtil = ADFSSecurityUtil.of(appKey);
        String decrypt = securityUtil.encrypt(token, content);
		
        return decrypt;
	}
    
    
}
