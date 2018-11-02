package com.yunuo.adfsdemo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.yunuo.adfsdemo.entity.UserInfo;

/**
 *	数据库操作层
 */
public interface UserInfoRepository extends JpaRepository<UserInfo,Long> {
	public UserInfo findByUserName(String userName);
	public UserInfo findByUserNameAndPassword(String userName, String password);

} 