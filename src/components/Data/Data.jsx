import  { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Data = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter posts with user ID 1
    const filteredData = posts.filter((post) => post.userId === 2);
    setFilteredPosts(filteredData);
  }, [posts]);

  // Calculate percentage of posts by user ID 1
  const percentagePostsByUserId1 = ((filteredPosts.length / posts.length) * 100).toFixed(2);

  // Pie chart data
  const pieChartData = [
    { name: 'User ID 1', value: filteredPosts.length },
    { name: 'Other Users', value: posts.length - filteredPosts.length },
  ];

  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-bold p-4 text-center'>Data Visualization</h2>
      <table className='table-auto w-full mb-8'>
        <thead>
          <tr>
            <th className='px-4 py-2'>ID</th>
            <th className='px-4 py-2'>Title</th>
            <th className='px-4 py-2'>Body</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.map((post) => (
            <tr key={post.id}>
              <td className='px-4 py-2'>{post.id}</td>
              <td className='px-4 py-2'>{post.title}</td>
              <td className='px-4 py-2'>{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pie chart */}
      <h3 className='text-xl font-bold mb-4 text-center'>Pie Chart - Percentage of Posts by User ID 1</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieChartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <p className='text-lg font-bold text-center'>Total Posts: {posts.length}</p>
      <p className='text-lg font-bold text-center'>Posts by User ID 1: {filteredPosts.length}</p>
      <p className='text-lg font-bold text-center'>Percentage of Posts by User ID 1: {percentagePostsByUserId1}%</p>
    </div>
  );
};

export default Data;
