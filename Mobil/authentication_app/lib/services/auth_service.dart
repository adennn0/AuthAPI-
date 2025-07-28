import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../models/auth_models.dart';

class AuthService {
  static const String baseUrl = 'http://localhost:5299/api/auth';
  static const FlutterSecureStorage _storage = FlutterSecureStorage();
  
  // Token saklama anahtarları
  static const String _tokenKey = 'auth_token';
  static const String _userKey = 'user_data';

  // Login işlemi
  static Future<AuthResponse> login(String email, String password) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/login'),
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode(LoginRequest(
          email: email,
          password: password,
        ).toJson()),
      );

      final data = jsonDecode(response.body);
      final authResponse = AuthResponse.fromJson(data);

      if (authResponse.success && authResponse.token != null) {
        // Token'ı güvenli şekilde sakla
        await _storage.write(key: _tokenKey, value: authResponse.token);
        
        // Kullanıcı bilgilerini sakla
        if (authResponse.user != null) {
          await _storage.write(
            key: _userKey, 
            value: jsonEncode(authResponse.user!.toJson())
          );
        }
      }

      return authResponse;
    } catch (e) {
      return AuthResponse(
        success: false,
        message: 'Bağlantı hatası: $e',
      );
    }
  }

  // Register işlemi
  static Future<AuthResponse> register({
    required String email,
    required String password,
    String? username,
    String? role,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/register'),
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode(RegisterRequest(
          email: email,
          password: password,
          username: username,
          role: role,
        ).toJson()),
      );

      final data = jsonDecode(response.body);
      final authResponse = AuthResponse.fromJson(data);

      if (authResponse.success && authResponse.token != null) {
        // Token'ı güvenli şekilde sakla
        await _storage.write(key: _tokenKey, value: authResponse.token);
        
        // Kullanıcı bilgilerini sakla
        if (authResponse.user != null) {
          await _storage.write(
            key: _userKey, 
            value: jsonEncode(authResponse.user!.toJson())
          );
        }
      }

      return authResponse;
    } catch (e) {
      return AuthResponse(
        success: false,
        message: 'Bağlantı hatası: $e',
      );
    }
  }

  // Profil bilgilerini getir
  static Future<AuthResponse> getProfile() async {
    try {
      final token = await _storage.read(key: _tokenKey);
      if (token == null) {
        return AuthResponse(
          success: false,
          message: 'Token bulunamadı',
        );
      }

      final response = await http.get(
        Uri.parse('$baseUrl/profile'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
      );

      final data = jsonDecode(response.body);
      return AuthResponse.fromJson(data);
    } catch (e) {
      return AuthResponse(
        success: false,
        message: 'Bağlantı hatası: $e',
      );
    }
  }

  // Token'ı getir
  static Future<String?> getToken() async {
    return await _storage.read(key: _tokenKey);
  }

  // Kullanıcı bilgilerini getir
  static Future<UserInfo?> getUser() async {
    try {
      final userData = await _storage.read(key: _userKey);
      if (userData != null) {
        final userJson = jsonDecode(userData);
        return UserInfo.fromJson(userJson);
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  // Çıkış yap
  static Future<void> logout() async {
    await _storage.delete(key: _tokenKey);
    await _storage.delete(key: _userKey);
  }

  // Kullanıcı giriş yapmış mı kontrol et
  static Future<bool> isLoggedIn() async {
    final token = await _storage.read(key: _tokenKey);
    return token != null;
  }

  // Şifre değiştirme
  static Future<AuthResponse> changePassword({
    required String currentPassword,
    required String newPassword,
    required String confirmPassword,
  }) async {
    try {
      final token = await _storage.read(key: _tokenKey);
      if (token == null) {
        return AuthResponse(
          success: false,
          message: 'Token bulunamadı',
        );
      }

      final response = await http.post(
        Uri.parse('$baseUrl/change-password'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
        body: jsonEncode(ChangePasswordRequest(
          currentPassword: currentPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        ).toJson()),
      );

      final data = jsonDecode(response.body);
      return AuthResponse.fromJson(data);
    } catch (e) {
      return AuthResponse(
        success: false,
        message: 'Bağlantı hatası: $e',
      );
    }
  }

  // Test endpoint'i
  static Future<Map<String, dynamic>> testConnection() async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/test'));
      return jsonDecode(response.body);
    } catch (e) {
      return {
        'success': false,
        'message': 'Bağlantı hatası: $e',
      };
    }
  }
} 