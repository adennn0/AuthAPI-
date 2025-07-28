import { useNavigate } from 'react-router-dom';

function DashboardPage() {

    const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
      <div className="bg-white shadow-xl rounded-xl p-10 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-4">Hoş Geldiniz</h1>
        <p className="text-gray-600 text-lg">
          Başarıyla giriş yaptınız. Dashboard sayfasındasınız.
        </p>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Çıkış Yap
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;