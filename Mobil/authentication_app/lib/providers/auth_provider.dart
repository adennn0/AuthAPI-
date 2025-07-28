import 'package:flutter/material.dart';
import '../models/auth_models.dart';
import '../services/auth_service.dart';

class AuthProvider extends ChangeNotifier {
  UserInfo? _user;
  bool _isLoading = false;
  String? _error;
  bool _isLoggedIn = false;

  UserInfo? get user => _user;
  bool get isLoading => _isLoading;
  String? get error => _error;
  bool get isLoggedIn => _isLoggedIn;

  AuthProvider() {
    _checkLoginStatus();
  }

  // Uygulama başladığında login durumunu kontrol et
  Future<void> _checkLoginStatus() async {
    _isLoggedIn = await AuthService.isLoggedIn();
    if (_isLoggedIn) {
      _user = await AuthService.getUser();
    }
    notifyListeners();
  }

  // Login işlemi
  Future<bool> login(String email, String password) async {
    _setLoading(true);
    _clearError();

    try {
      final response = await AuthService.login(email, password);
      
      if (response.success) {
        _user = response.user;
        _isLoggedIn = true;
        _setLoading(false);
        return true;
      } else {
        _setError(response.message);
        _setLoading(false);
        return false;
      }
    } catch (e) {
      _setError('Giriş sırasında hata oluştu: $e');
      _setLoading(false);
      return false;
    }
  }

  // Register işlemi
  Future<bool> register({
    required String email,
    required String password,
    String? username,
    String? role,
  }) async {
    _setLoading(true);
    _clearError();

    try {
      final response = await AuthService.register(
        email: email,
        password: password,
        username: username,
        role: role,
      );
      
      if (response.success) {
        _user = response.user;
        _isLoggedIn = true;
        _setLoading(false);
        return true;
      } else {
        _setError(response.message);
        _setLoading(false);
        return false;
      }
    } catch (e) {
      _setError('Kayıt sırasında hata oluştu: $e');
      _setLoading(false);
      return false;
    }
  }

  // Profil bilgilerini getir
  Future<bool> getProfile() async {
    _setLoading(true);
    _clearError();

    try {
      final response = await AuthService.getProfile();
      
      if (response.success) {
        _user = response.user;
        _setLoading(false);
        return true;
      } else {
        _setError(response.message);
        _setLoading(false);
        return false;
      }
    } catch (e) {
      _setError('Profil bilgileri alınırken hata oluştu: $e');
      _setLoading(false);
      return false;
    }
  }

  // Logout işlemi
  Future<void> logout() async {
    await AuthService.logout();
    _user = null;
    _isLoggedIn = false;
    _clearError();
    notifyListeners();
  }

  // Şifre değiştirme
  Future<bool> changePassword({
    required String currentPassword,
    required String newPassword,
    required String confirmPassword,
  }) async {
    _setLoading(true);
    _clearError();

    try {
      final response = await AuthService.changePassword(
        currentPassword: currentPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      );
      
      if (response.success) {
        _setLoading(false);
        return true;
      } else {
        _setError(response.message);
        _setLoading(false);
        return false;
      }
    } catch (e) {
      _setError('Şifre değiştirme sırasında hata oluştu: $e');
      _setLoading(false);
      return false;
    }
  }

  // API bağlantısını test et
  Future<Map<String, dynamic>> testConnection() async {
    return await AuthService.testConnection();
  }

  // Loading durumunu ayarla
  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  // Hata mesajını ayarla
  void _setError(String error) {
    _error = error;
    notifyListeners();
  }

  // Hata mesajını temizle
  void _clearError() {
    _error = null;
    notifyListeners();
  }

  // Manuel hata temizleme
  void clearError() {
    _clearError();
  }
} 