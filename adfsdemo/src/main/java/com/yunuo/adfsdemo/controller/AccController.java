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
		try {
			String token = request.getParameter("Token");
			
			LoginInfo loginInfo = OnlineInfo.LoginInfoMap.get(token);
			if(loginInfo == null)
			{
				return "";
			}
			AccountInfo accountInfo = loginInfo.getAccountInfo();
			
			String content = JSON.toJSONString(accountInfo);
			
			ADFSSecurityUtil securityUtil = ADFSSecurityUtil.of(SystemContent.ADFS_APP_KEY);
			String decrypt = securityUtil.encrypt(token, content);
			
			return decrypt;
			
		} catch (Exception e) {
			e.printStackTrace();
			return "";
		}
	}
    
    
}
