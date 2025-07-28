import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import loginImage from './resim.png';
import api from '../api/axios';

export default function RegisterPage() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !passwordConfirm) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    if (password !== passwordConfirm) {
      alert("Şifreler uyuşmuyor!");
      return;
    }

    try {
      const response = await api.post('/Auth/register', {
        username,
        email,
        password,
        confirmPassword: passwordConfirm,
        role: "User"
      });

      const token = response.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ username, email }));

      navigate('/dashboard');
    } catch (error) {
      console.error('Register error:', error);
    const message = error.response?.data?.message || 'Sunucu hatası';
      alert('Kayıt başarısız: ' + (error.response?.data || 'Sunucu hatası'));
    }
  };

  return (

    

    <div className="min-h-screen flex flex-col ">
              <header className="py-6 md:px-6">
                <h1 className="text-lg font-semibold mx-6">Your Logo</h1>
              </header>
        
              
              <main className="mb-6 flex flex-col md:flex-row items-center justify-center px-4 md:px-16 ">
      
                <div className="w-full md:w-[505px] max-w-md flex flex-col border border-gray-300 rounded-lg p-6 w-fit h-fit">
                  <h2 className="text-2xl font-medium mb-4">Hoş geldiniz !</h2>
        
                  <form className="space-y-6" onSubmit={handleRegister}>
                    
                    <div className='space-y-1'>
                      <p className="font-bold text-3xl">Kayıt Olun</p>
                      <p className=" font-medium">Lorem ipsum is simply</p>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                        <input
                         id="email"
                         type="email"
                         placeholder="Emailinizi girin"
                         className="w-full border border-gray-500 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium mb-1" htmlFor="username">Kullanıcı Adı</label>
                        <input
                         id="ad"
                        type="text"
                       placeholder="Kullanıcı adınızı girin"
                       className="w-full border border-gray-500 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                       />
                   </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium mb-1" htmlFor="password">Şifre</label>
                      <div className="relative">
                      <input
                         id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Şifrenizi girin"
                          className="w-full border border-gray-500 rounded-md p-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                      />
                      <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-600"
                      tabIndex={-1}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium mb-1" htmlFor="passwordConfirm">Şifre Doğrula</label>
                    <div className="relative">
                      <input
                        id="passwordConfirm"
                        type={showPasswordConfirm ? "text" : "password"}
                        placeholder="Şifrenizi doğrulayın"
                        className="w-full border border-gray-500 rounded-md p-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-600"
                        tabIndex={-1}
                      >
                        {showPasswordConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
                  >
                    Kayıt Ol
                  </button>
                  
                </form>
                <p className="text-center text-base text-gray-400 mt-4">
                    Zaten hesabın var mı?{" "}
                    <Link to="/" className="text-black hover:underline font-bold">
                        Giriş Yap
                    </Link>
                  </p>
                </div>
        
                {/* Image Section */}
                <div className="hidden md:flex md:w-1/2 justify-center">
                  <img
                    src={loginImage}
                    alt="Login visual"
                    className="w-[827px] h-[625px] object-contain"
                  />
                </div>
              </main>
            </div>

  );
}
