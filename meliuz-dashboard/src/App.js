import React, { useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingDown, AlertCircle, DollarSign, Users, ShoppingCart } from 'lucide-react';

const MeliuzAnalysis = () => {
  // Dados simulados baseados na planilha
  const rawData = [
    // Agosto
    { month: 'Agosto', week: 1, newUsers: 12, totalUsers: 45, revenue: 8950.32, commission: 895.03, cashback: 447.52, partner: 'A', transactions: 45 },
    { month: 'Agosto', week: 2, newUsers: 15, totalUsers: 52, revenue: 9845.67, commission: 984.57, cashback: 492.28, partner: 'B', transactions: 52 },
    { month: 'Agosto', week: 3, newUsers: 10, totalUsers: 48, revenue: 9234.21, commission: 923.42, cashback: 461.71, partner: 'C', transactions: 48 },
    { month: 'Agosto', week: 4, newUsers: 14, totalUsers: 55, revenue: 10567.89, commission: 1056.79, cashback: 528.39, partner: 'Total', transactions: 55 },
    // Setembro - com queda
    { month: 'Setembro', week: 1, newUsers: 8, totalUsers: 38, revenue: 7123.45, commission: 712.35, cashback: 356.17, partner: 'A', transactions: 38 },
    { month: 'Setembro', week: 2, newUsers: 6, totalUsers: 32, revenue: 6234.56, commission: 623.46, cashback: 311.73, partner: 'B', transactions: 32 },
    { month: 'Setembro', week: 3, newUsers: 7, totalUsers: 35, revenue: 6789.23, commission: 678.92, cashback: 339.46, partner: 'C', transactions: 35 },
    { month: 'Setembro', week: 4, newUsers: 5, totalUsers: 30, revenue: 5890.12, commission: 589.01, cashback: 294.51, partner: 'Total', transactions: 30 },
  ];

  // KPIs calculados
  const kpis = useMemo(() => {
    const agostoData = rawData.filter(d => d.month === 'Agosto');
    const setembroData = rawData.filter(d => d.month === 'Setembro');
    
    const agostoTotal = agostoData.reduce((acc, curr) => ({
      revenue: acc.revenue + curr.revenue,
      transactions: acc.transactions + curr.transactions,
      newUsers: acc.newUsers + curr.newUsers,
      commission: acc.commission + curr.commission
    }), { revenue: 0, transactions: 0, newUsers: 0, commission: 0 });

    const setembroTotal = setembroData.reduce((acc, curr) => ({
      revenue: acc.revenue + curr.revenue,
      transactions: acc.transactions + curr.transactions,
      newUsers: acc.newUsers + curr.newUsers,
      commission: acc.commission + curr.commission
    }), { revenue: 0, transactions: 0, newUsers: 0, commission: 0 });

    return {
      revenueChange: ((setembroTotal.revenue - agostoTotal.revenue) / agostoTotal.revenue * 100).toFixed(1),
      transactionsChange: ((setembroTotal.transactions - agostoTotal.transactions) / agostoTotal.transactions * 100).toFixed(1),
      newUsersChange: ((setembroTotal.newUsers - agostoTotal.newUsers) / agostoTotal.newUsers * 100).toFixed(1),
      avgTicketAgosto: (agostoTotal.revenue / agostoTotal.transactions).toFixed(2),
      avgTicketSetembro: (setembroTotal.revenue / setembroTotal.transactions).toFixed(2),
      conversionRate: ((setembroTotal.transactions / setembroTotal.newUsers) * 100).toFixed(1)
    };
  }, []);

  // Dados agregados por mês
  const monthlyData = [
    {
      month: 'Agosto',
      receita: 38598.09,
      transacoes: 200,
      novosUsuarios: 51,
      ticketMedio: 193.0,
      comissao: 3859.81
    },
    {
      month: 'Setembro',
      receita: 26037.36,
      transacoes: 135,
      novosUsuarios: 26,
      ticketMedio: 192.9,
      comissao: 2603.74
    }
  ];

  // Dados por parceiro
  const partnerData = [
    { name: 'Parceiro A', agosto: 12500, setembro: 8200, change: -34.4 },
    { name: 'Parceiro B', agosto: 13200, setembro: 9100, change: -31.1 },
    { name: 'Parceiro C', agosto: 12898, setembro: 8737, change: -32.3 },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard de Performance - E-Commerce Méliuz</h1>
          <p className="text-gray-600">Análise Agosto vs Setembro 2025</p>
        </div>

        {/* Alert de Queda */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg shadow">
          <div className="flex items-center">
            <AlertCircle className="text-red-500 mr-3" size={24} />
            <div>
              <h3 className="text-red-800 font-semibold">Queda Crítica Detectada</h3>
              <p className="text-red-700">Receita caiu 32.5% em Setembro. Necessária ação imediata.</p>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <DollarSign className="text-red-500 mr-2" size={24} />
                <h3 className="text-gray-700 font-semibold">Receita</h3>
              </div>
              <TrendingDown className="text-red-500" size={20} />
            </div>
            <p className="text-3xl font-bold text-gray-900">R$ 26.037</p>
            <p className="text-red-600 text-sm mt-2 font-semibold">↓ {kpis.revenueChange}% vs Agosto</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <ShoppingCart className="text-orange-500 mr-2" size={24} />
                <h3 className="text-gray-700 font-semibold">Transações</h3>
              </div>
              <TrendingDown className="text-orange-500" size={20} />
            </div>
            <p className="text-3xl font-bold text-gray-900">135</p>
            <p className="text-orange-600 text-sm mt-2 font-semibold">↓ {kpis.transactionsChange}% vs Agosto</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Users className="text-yellow-500 mr-2" size={24} />
                <h3 className="text-gray-700 font-semibold">Novos Usuários</h3>
              </div>
              <TrendingDown className="text-yellow-500" size={20} />
            </div>
            <p className="text-3xl font-bold text-gray-900">26</p>
            <p className="text-yellow-600 text-sm mt-2 font-semibold">↓ {kpis.newUsersChange}% vs Agosto</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Receita Mensal */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Evolução da Receita</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `R$ ${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="receita" fill="#3b82f6" name="Receita (R$)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Transações */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Transações por Mês</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="transacoes" stroke="#10b981" strokeWidth={3} name="Transações" />
                <Line type="monotone" dataKey="novosUsuarios" stroke="#f59e0b" strokeWidth={3} name="Novos Usuários" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Análise por Parceiro */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance por Parceiro</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={partnerData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `R$ ${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="agosto" fill="#3b82f6" name="Agosto" />
              <Bar dataKey="setembro" fill="#ef4444" name="Setembro" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Diagnóstico */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">🔍 Diagnóstico - Causa Raiz</h3>
          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-semibold text-red-900 mb-2">1. Queda Acentuada de Novos Usuários (-49%)</h4>
              <p className="text-red-800">A principal causa raiz é a redução drástica na aquisição de novos usuários (de 51 para 26).</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-900 mb-2">2. Todos os Parceiros Afetados</h4>
              <p className="text-orange-800">Parceiro A (-34%), B (-31%) e C (-32%) - indica problema sistêmico, não isolado.</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">3. Ticket Médio Estável (R$ 193 → R$ 192.9)</h4>
              <p className="text-yellow-800">O problema NÃO é no valor médio das compras, mas no VOLUME de transações.</p>
            </div>
          </div>
        </div>

        {/* Plano de Ação */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-2xl font-bold mb-4">🎯 Plano de Ação Imediato</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h4 className="font-semibold mb-2">1. Marketing & Aquisição</h4>
              <ul className="text-sm space-y-1">
                <li>• Revisar campanhas de mídia paga</li>
                <li>• Aumentar investimento em performance</li>
                <li>• Reativar campanhas de referral</li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h4 className="font-semibold mb-2">2. Retenção & Engajamento</h4>
              <ul className="text-sm space-y-1">
                <li>• Push notifications para base inativa</li>
                <li>• Cashback especial para reativação</li>
                <li>• Email marketing segmentado</li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h4 className="font-semibold mb-2">3. Parceiros</h4>
              <ul className="text-sm space-y-1">
                <li>• Negociar comissões mais atrativas</li>
                <li>• Campanhas exclusivas por parceiro</li>
                <li>• Revisar mix de produtos</li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h4 className="font-semibold mb-2">4. Monitoramento</h4>
              <ul className="text-sm space-y-1">
                <li>• Dashboard diário de novos usuários</li>
                <li>• Alertas automáticos de queda</li>
                <li>• A/B tests nas landing pages</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeliuzAnalysis;