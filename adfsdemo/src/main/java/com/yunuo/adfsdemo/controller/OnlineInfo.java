package com.yunuo.adfsdemo.controller;

import java.util.concurrent.ConcurrentHashMap;

public class OnlineInfo {
	public static ConcurrentHashMap<String,AccountInfo> onlineUserMap = new ConcurrentHashMap<>();
}
