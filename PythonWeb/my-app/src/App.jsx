import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

 
  const fetchCustomers = async () => {
    try {
     
      const response = await axios.get('https://backend-python-203b.onrender.com/api/customers');
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

  if (loading) return <h1>Loading data of mongodb...</h1>;

 return (
    <div className="container">
      <h1>Customer List</h1>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead style={{ backgroundColor: '#282c34', color: 'white' }}>
          <tr>
            
            <th style={{ padding: '10px' }}>ID</th>
            <th style={{ padding: '10px' }}>Full Name</th>
            <th style={{ padding: '10px' }}>Email</th>
            <th style={{ padding: '10px' }}>Type</th>
            <th style={{ padding: '10px' }}>Discount</th>
            <th style={{ padding: '10px' }}>Total Sale</th>
          </tr>
        </thead>
        <tbody>
      
          {Array.isArray(customers) && customers.map((customer) => (
            <tr key={customer.uid} style={{ textAlign: 'center' }}>
              {/* 2. Nuevas celdas (Datos) */}
              <td style={{ padding: '8px', fontWeight: 'bold' }}>{customer.id}</td>
              
              <td style={{ padding: '8px' }}>{customer.fullName}</td>
              <td style={{ padding: '8px' }}>{customer.email}</td>
              
              <td style={{ padding: '8px', color: customer.type === 'Frquent' ? 'green' : 'blue' }}>
                {customer.type}
              </td>

              <td style={{ padding: '8px' }}>{customer.discount}%</td>
              
              <td style={{ padding: '8px' }}>${customer.totalSale}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;