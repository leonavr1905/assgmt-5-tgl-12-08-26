import React, { useState, useMemo } from 'react';
import { ConfigProvider, Layout, Typography, Input, Select, Space, Button, Card, Tag, Tooltip, Divider } from 'antd';
import {
  SearchOutlined,
  ReloadOutlined,
  BookOutlined,
  ExperimentOutlined,
  FilterOutlined,
  InfoCircleOutlined,
  TrophyOutlined,
  StarOutlined
} from '@ant-design/icons';
import { students as initialStudents } from './data/students';
import StudentTable from './components/StudentTable';
import StatsOverview from './components/StatsOverview';

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

function App() {
  const [searchText, setSearchText] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');

  // Filter students dynamically based on search text and class selection
  const filteredStudents = useMemo(() => {
    return initialStudents.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchText.toLowerCase()) ||
        student.id.toLowerCase().includes(searchText.toLowerCase());

      const matchesClass =
        selectedClass === 'ALL' || student.class === selectedClass;

      return matchesSearch && matchesClass;
    });
  }, [searchText, selectedClass]);

  const handleReset = () => {
    setSearchText('');
    setSelectedClass('ALL');
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#4f46e5',
          borderRadius: 10,
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        },
      }}
    >
      <Layout style={{ minHeight: '100vh', background: '#f8fafc' }}>
        {/* Navigation / App Bar Header */}
        <Header
          style={{
            background: '#ffffff',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            height: 72,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: 20,
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
              }}
            >
              <BookOutlined />
            </div>
            <div>
              <Title level={4} style={{ margin: 0, fontWeight: 700, color: '#0f172a' }}>
                RPL Assignment 5
              </Title>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Ant Design Table Component & Custom Rendering
              </Text>
            </div>
          </div>

          <Tag color="purple" style={{ padding: '4px 12px', borderRadius: 20, fontWeight: 600 }}>
            <ExperimentOutlined style={{ marginRight: 6 }} />
            Student Management System
          </Tag>
        </Header>

        {/* Main Body Content */}
        <Content style={{ padding: '32px 32px 48px', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
          
          {/* Header Description & Assignment Instructions Reference */}
          <div style={{ marginBottom: 24 }}>
            <Title level={2} style={{ margin: '0 0 8px 0', fontWeight: 800, color: '#0f172a' }}>
              Student Management Table
            </Title>
            <Paragraph type="secondary" style={{ fontSize: 14, margin: 0 }}>
              Interactive student database built with <strong>Ant Design Table</strong> featuring dynamic status tags, calculated grade classification, custom score coloring, gender & status filtering, and 5-rows pagination.
            </Paragraph>
          </div>

          {/* Stats Cards Overview */}
          <StatsOverview students={initialStudents} />

          {/* Filter Toolbar & Grade / Score Legend */}
          <Card
            bordered={false}
            style={{
              borderRadius: 16,
              marginBottom: 20,
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
              }}
            >
              {/* Search & Class Filter */}
              <Space wrap size="middle">
                <Input
                  placeholder="Search student by Name or ID..."
                  prefix={<SearchOutlined style={{ color: '#94a3b8' }} />}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ width: 280 }}
                  allowClear
                />

                <Select
                  value={selectedClass}
                  onChange={(val) => setSelectedClass(val)}
                  style={{ width: 160 }}
                  suffixIcon={<FilterOutlined />}
                >
                  <Option value="ALL">All Classes</Option>
                  <Option value="XII RPL 1">XII RPL 1</Option>
                  <Option value="XII RPL 2">XII RPL 2</Option>
                  <Option value="XII RPL 3">XII RPL 3</Option>
                </Select>

                {(searchText || selectedClass !== 'ALL') && (
                  <Button icon={<ReloadOutlined />} onClick={handleReset}>
                    Reset Filters
                  </Button>
                )}
              </Space>

              {/* Legends: Score Tags & Grade Criteria */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Text type="secondary" style={{ fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <StarOutlined /> Score Tag:
                  </Text>
                  <Tag color="green">≥90 Excellent</Tag>
                  <Tag color="blue">80–89 Good</Tag>
                  <Tag color="gold">70–79 Average</Tag>
                  <Tag color="red">&lt;70 Needs Imp.</Tag>
                </div>

                <Divider type="vertical" style={{ height: 20 }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Text type="secondary" style={{ fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <TrophyOutlined /> Grade:
                  </Text>
                  <Tag color="purple">A (90-100)</Tag>
                  <Tag color="blue">B (80-89)</Tag>
                  <Tag color="orange">C (70-79)</Tag>
                  <Tag color="magenta">D (&lt;70)</Tag>
                </div>
              </div>
            </div>
          </Card>

          {/* Ant Design Student Table */}
          <StudentTable dataSource={filteredStudents} />

        </Content>

        {/* Footer */}
        <Footer style={{ textAlign: 'center', color: '#64748b', background: 'transparent' }}>
          Assignment 5 — Ant Design Table Implementation ©2026 Created with React & Ant Design
        </Footer>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
