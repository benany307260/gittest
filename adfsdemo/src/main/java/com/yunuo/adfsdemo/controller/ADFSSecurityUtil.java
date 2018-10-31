package com.yunuo.adfsdemo.controller;

import java.nio.charset.Charset;
import java.security.NoSuchAlgorithmException;

import javax.crypto.Cipher;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.binary.Hex;

/**
 * ADFS接口加解密
 *
 */
public final class ADFSSecurityUtil
{
  private static final String SECRET_KEY = "DESede";
  private static final String CIPHER = "DESede/CBC/PKCS5Padding";
  private static final Charset CHARSET = Charset.forName("UTF-8");
  private Cipher cipher = null;
  private SecretKey key = null;
  private String appkey = null;

  public ADFSSecurityUtil(String appkey)
  {
    if (appkey == null)
      throw new IllegalArgumentException("appkey cannot be null");

    this.appkey = appkey;

    init();
  }

  public static ADFSSecurityUtil of(String appkey) {
    return new ADFSSecurityUtil(appkey);
  }

  private void init()
  {
    byte[] tmpKey = getAppKey();
    this.key = new SecretKeySpec(tmpKey, "DESede");
    try {
      this.cipher = Cipher.getInstance("DESede/CBC/PKCS5Padding");
    } catch (NoSuchAlgorithmException e) {
      e.printStackTrace();
    } catch (NoSuchPaddingException e) {
      e.printStackTrace();
    }
  }

  private byte[] getAppKey() {
    byte[] appKey = parseHexStr2Byte(this.appkey);
    byte[] tmpkey = { 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7 };
    for (int ii = 0; ii < tmpkey.length; ++ii)
    {
      tmpkey[ii] = appKey[ii];
    }
    return tmpkey;
  }

  public synchronized String encrypt(String iv, String content)
  {
    String result = null;
    try {
      byte[] tmpiv = getIv(iv);
      byte[] contentBytes = content.getBytes(CHARSET);
      IvParameterSpec ivParameterSpec = new IvParameterSpec(tmpiv);
      this.cipher.init(1, this.key, ivParameterSpec);
      byte[] bytes = this.cipher.doFinal(contentBytes);
      result = Base64.encodeBase64String(bytes);
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
    return result;
  }

  public synchronized String decrypt(String iv, String content)
  {
    String result = null;
    try {
      byte[] byteIv = getIv(iv);
      IvParameterSpec ivParameterSpec = new IvParameterSpec(byteIv);

      this.cipher.init(2, this.key, ivParameterSpec);
      byte[] decoderStr = Base64.decodeBase64(content);
      byte[] bytes = this.cipher.doFinal(decoderStr, 0, decoderStr.length);
      result = new String(bytes, CHARSET);
    } catch (Exception e) {
      e.printStackTrace();
    }

    return result;
  }

  private static byte[] getIv(String iv) {
    byte[] byteIv = parseHexStr2Byte(iv);
    byte[] tmpiv = { 0, 1, 2, 3, 4, 5, 6, 7 };
    for (int i = 0; i < tmpiv.length; ++i)
    {
      tmpiv[i] = byteIv[i];
    }
    return tmpiv;
  }

  private static synchronized String parseByte2HexStr(byte[] buf)
  {
    String result = new String(Hex.encodeHex(buf));
    return result;
  }

  private static synchronized byte[] parseHexStr2Byte(String hexStr)
  {
    byte[] result = null;
    if ((hexStr != null) && (!(hexStr.isEmpty())))
      try {
        result = Hex.decodeHex(hexStr.toCharArray());
      } catch (DecoderException e) {
        e.printStackTrace();
      }

    return result;
  }
}