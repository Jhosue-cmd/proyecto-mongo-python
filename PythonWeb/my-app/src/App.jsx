import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para pedir datos a Python
  const fetchCustomers = async () => {
    try {
      // Asegúrate de que tu Python esté corriendo en el puerto 8000
      const response = await axios.get('http://localhost:8000/api/customers');
      setCustomers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error conectando con Python:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (loading) return <h1>Cargando datos de MongoDB...</h1>;

  return (
    <div className="container">
      <h1>Lista de Clientes (MongoDB + Python + React)</h1>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead style={{ backgroundColor: '#282c34', color: 'white' }}>
          <tr>
            <th style={{ padding: '10px' }}>Full Name</th>
            <th style={{ padding: '10px' }}>Email</th>
            <th style={{ padding: '10px' }}>Type</th>
            <th style={{ padding: '10px' }}>Total Sale</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.uid} style={{ textAlign: 'center' }}>
              <td style={{ padding: '8px' }}>{customer.fullName}</td>
              <td style={{ padding: '8px' }}>{customer.email}</td>
              <td style={{ padding: '8px', color: customer.type === 'Frquent' ? 'green' : 'blue' }}>
                {customer.type}
              </td>
              <td style={{ padding: '8px' }}>${customer.totalSale}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;