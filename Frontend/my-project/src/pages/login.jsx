import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImage from './resim.png';
import { Link } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react';
import api from '../api/axios';

function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/Auth/login', {
        email,
        password
      });

      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (error) {
      alert('Giriş başarısız! ' + (error.response?.data || 'Sunucu hatası'));
    }
  };


  return (

    <div className="min-h-screen flex flex-col">
          
          <header className="py-6 md:px-6">
            <h1 className="text-lg font-semibold mx-6">Your Logo</h1>
          </header>
    
          
          <main className="mb-6 flex flex-col md:flex-row items-center justify-center px-4 md:px-16">
            
            <div className="w-full md:w-[505px] max-w-md flex flex-col border border-gray-300 rounded-lg p-6 w-fit h-fit">
              <h2 className="text-2xl font-medium mb-10">Hoş geldiniz !</h2>
              
    
              <form className="space-y-8" onSubmit={handleLogin}>
                <div className='space-y-1'>
                  <p className="font-bold text-3xl">Giriş Yapın</p>
                  <p className="font-medium">Lorem ipsum is simply</p>
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
                  <label className="block text-sm font-medium mb-1" htmlFor="password">Şifre</label>
                  <div className='relative'>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Şifrenizi girin"
                      className="w-full border border-gray-500 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                  

                  <div class="flex items-center justify-between mt-2">
                    <label class="flex items-center space-x-2">
                      <input type="checkbox" class="form-checkbox text-blue-600"/>
                       <span class="text-sm text-gray-700">Beni hatırla</span>
                    </label>
                    <p class="text-sm text-gray-400 cursor-pointer hover:underline">
                         Şifreni mi unuttun?
                   </p>
                  </div>

                </div>
                
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
                >
                  Giriş Yap
                </button>
                
              </form>
              <p className="text-center text-base text-gray-400 mt-12">
                  Hesabın yok mu?{" "}
                  <Link to="/register" className="text-black hover:underline font-bold">
                    Kayıt Ol
                  </Link>
                </p>
            </div>
    
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

export default LoginPage;
