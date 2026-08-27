import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import {
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  TrophyOutlined,
  RiseOutlined
} from '@ant-design/icons';
import { calculateGrade } from '../utils/gradeCalculator';

const StatsOverview = ({ students }) => {
  const total = students.length;
  const activeCount = students.filter((s) => s.status === 'Active').length;
  const inactiveCount = students.filter((s) => s.status === 'Inactive').length;
  
  const avgScore = total > 0 
    ? (students.reduce((acc, s) => acc + s.score, 0) / total).toFixed(1)
    : 0;

  const topGradeCount = students.filter((s) => calculateGrade(s.score) === 'A').length;

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
      <Col xs={24} sm={12} md={6}>
        <Card
          bordered={false}
          style={{
            borderRadius: 14,
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            color: '#ffffff',
            boxShadow: '0 4px 20px rgba(99, 102, 241, 0.25)',
          }}
        >
          <Statistic
            title={<span style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: 13, fontWeight: 500 }}>Total Students</span>}
            value={total}
            prefix={<UserOutlined style={{ color: '#ffffff', marginRight: 6 }} />}
            valueStyle={{ color: '#ffffff', fontWeight: 700, fontSize: 28 }}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} md={6}>
        <Card
          bordered={false}
          style={{
            borderRadius: 14,
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#ffffff',
            boxShadow: '0 4px 20px rgba(16, 185, 129, 0.25)',
          }}
        >
          <Statistic
            title={<span style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: 13, fontWeight: 500 }}>Active Status</span>}
            value={activeCount}
            suffix={`/ ${total}`}
            prefix={<CheckCircleOutlined style={{ color: '#ffffff', marginRight: 6 }} />}
            valueStyle={{ color: '#ffffff', fontWeight: 700, fontSize: 28 }}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} md={6}>
        <Card
          bordered={false}
          style={{
            borderRadius: 14,
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            color: '#ffffff',
            boxShadow: '0 4px 20px rgba(245, 158, 11, 0.25)',
          }}
        >
          <Statistic
            title={<span style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: 13, fontWeight: 500 }}>Average Score</span>}
            value={avgScore}
            prefix={<RiseOutlined style={{ color: '#ffffff', marginRight: 6 }} />}
            valueStyle={{ color: '#ffffff', fontWeight: 700, fontSize: 28 }}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} md={6}>
        <Card
          bordered={false}
          style={{
            borderRadius: 14,
            background: 'linear-gradient(135deg, #ec4899 0%, #d946ef 100%)',
            color: '#ffffff',
            boxShadow: '0 4px 20px rgba(236, 72, 153, 0.25)',
          }}
        >
          <Statistic
            title={<span style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: 13, fontWeight: 500 }}>Grade A Achievers</span>}
            value={topGradeCount}
            suffix="Students"
            prefix={<TrophyOutlined style={{ color: '#ffffff', marginRight: 6 }} />}
            valueStyle={{ color: '#ffffff', fontWeight: 700, fontSize: 28 }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default StatsOverview;
