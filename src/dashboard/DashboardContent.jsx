import { Grid, Typography } from '@mui/material';
import React from 'react'
import { Container } from 'react-bootstrap';
import { LineChart, Line, ScatterChart, Scatter, AreaChart, Area, RadialBarChart, RadialBar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export default function DashboardContent() {

  const data = [
    { name: 'Jan', users: 400, products: 240 },
    { name: 'Feb', users: 300, products: 139 },
    { name: 'Mar', users: 200, products: 980 },
    { name: 'Apr', users: 278, products: 390 },
    { name: 'May', users: 189, products: 480 },
    { name: 'Jun', users: 239, products: 380 },
    { name: 'Jul', users: 349, products: 430 },
    { name: 'August', users: 449, products: 480 },
  ];

  const pieData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];

  const radarData = [
    { subject: 'Math', A: 120, B: 110, fullMark: 150 },
    { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
    { subject: 'English', A: 86, B: 130, fullMark: 150 },
    { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
    { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
    { subject: 'History', A: 65, B: 85, fullMark: 150 },
  ];

  const scatterData = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
  ];

  const areaData = [
    { month: 'Jan', value: 400 },
    { month: 'Feb', value: 300 },
    { month: 'Mar', value: 200 },
    { month: 'Apr', value: 278 },
    { month: 'May', value: 189 },
    { month: 'Jun', value: 239 },
    { month: 'Jul', value: 349 },
  ];

  const radialBarData = [
    { name: '18-24', uv: 31.47, fill: '#8884d8' },
    { name: '25-29', uv: 26.69, fill: '#83a6ed' },
    { name: '30-34', uv: 15.69, fill: '#8dd1e1' },
    { name: '35-39', uv: 8.22, fill: '#82ca9d' },
    { name: '40-49', uv: 8.63, fill: '#a4de6c' },
    { name: '50+', uv: 2.63, fill: '#d0ed57' },
    { name: 'unknown', uv: 6.67, fill: '#ffc658' },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div>
      <Typography variant='h3'>Revenue</Typography>
      <Container>
        <Grid container>
          <Grid item md={6}>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={data}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="products" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item md={6}>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={data}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#8884d8" />
                <Bar dataKey="products" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item md={6}>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item md={6}>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item md={6}>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart
                margin={{
                  top: 20, right: 20, bottom: 20, left: 20,
                }}
              >
                <CartesianGrid />
                <XAxis type="number" dataKey="x" name="stature" unit="cm" />
                <YAxis type="number" dataKey="y" name="weight" unit="kg" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter name="A school" data={scatterData} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item md={6}>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart
                data={areaData}
                margin={{
                  top: 10, right: 30, left: 0, bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
              </AreaChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item md={6}>
            <ResponsiveContainer width="100%" height={400}>
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="10%"
                outerRadius="80%"
                barSize={10}
                data={radialBarData}
              >
                <RadialBar
                  minAngle={15}
                  label={{ position: 'insideStart', fill: '#fff' }}
                  background
                  clockWise
                  dataKey="uv"
                />
                <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" align="right" />
                <Tooltip />
              </RadialBarChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>

      </Container>
    </div>
  )
}
