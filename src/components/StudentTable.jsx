import React from 'react';
import { Table, Tag, Tooltip, Progress } from 'antd';
import { calculateGrade, getGradeColor } from '../utils/gradeCalculator';
import {
  IdcardOutlined,
  TeamOutlined,
  TrophyOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

// Helper to determine Tag color & label for Score (Bonus Challenge B)
const getScoreTagConfig = (score) => {
  if (score >= 90) return { color: 'green', label: 'Excellent' };
  if (score >= 80) return { color: 'blue', label: 'Good' };
  if (score >= 70) return { color: 'gold', label: 'Average' };
  return { color: 'red', label: 'Needs Improvement' };
};

const StudentTable = ({ dataSource, loading }) => {
  // Column definitions for Ant Design Table
  const columns = [
    {
      title: 'Student ID',
      dataIndex: 'id',
      key: 'id',
      render: (id) => (
        <span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#4f46e5' }}>
          <IdcardOutlined style={{ marginRight: 6 }} />
          {id}
        </span>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: record.gender === 'Male' ? '#e0e7ff' : '#fce7f3',
              color: record.gender === 'Male' ? '#4338ca' : '#be185d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            {name.charAt(0)}
          </div>
          <div>
            <div style={{ fontWeight: 600, color: '#1e293b' }}>{name}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Class',
      dataIndex: 'class',
      key: 'class',
      render: (className) => (
        <Tag color="cyan" icon={<TeamOutlined />}>
          {className}
        </Tag>
      ),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      render: (age) => <span>{age} y/o</span>,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      // Bonus Challenge A: Gender Filter
      filters: [
        { text: 'Male', value: 'Male' },
        { text: 'Female', value: 'Female' },
      ],
      onFilter: (value, record) => record.gender === value,
      render: (gender) => (
        <Tag color={gender === 'Male' ? 'geekblue' : 'magenta'}>
          {gender}
        </Tag>
      ),
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      sorter: (a, b) => a.score - b.score,
      // Bonus Challenge B: Score Color using Tag
      render: (score) => {
        const { color, label } = getScoreTagConfig(score);
        return (
          <Tooltip title={`Performance: ${label}`}>
            <Tag
              color={color}
              style={{
                fontWeight: 700,
                fontSize: 13,
                padding: '2px 10px',
                borderRadius: 12,
              }}
            >
              {score}
            </Tag>
          </Tooltip>
        );
      },
    },
    {
      title: 'Grade',
      key: 'grade',
      render: (_, record) => {
        // Dynamic Grade calculation based on score:
        // 90-100: A, 80-89: B, 70-79: C, Below 70: D
        const grade = calculateGrade(record.score);
        const tagColor = getGradeColor(grade);
        return (
          <Tooltip title={`Score: ${record.score} -> Grade ${grade}`}>
            <Tag
              color={tagColor}
              style={{
                fontWeight: 700,
                fontSize: 13,
                padding: '2px 10px',
                borderRadius: 12,
              }}
            >
              <TrophyOutlined style={{ marginRight: 4 }} />
              Grade {grade}
            </Tag>
          </Tooltip>
        );
      },
    },
    {
      title: 'Attendance',
      dataIndex: 'attendance',
      key: 'attendance',
      sorter: (a, b) => a.attendance - b.attendance,
      render: (attendance) => (
        <div style={{ width: 120 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 2 }}>
            <span style={{ fontWeight: 600 }}>{attendance}%</span>
          </div>
          <Progress
            percent={attendance}
            size="small"
            showInfo={false}
            status={attendance >= 90 ? 'normal' : attendance >= 80 ? 'active' : 'exception'}
            strokeColor={attendance >= 90 ? '#10b981' : attendance >= 80 ? '#3b82f6' : '#f59e0b'}
          />
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'Inactive', value: 'Inactive' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        // Status Tag customization:
        // Active -> green tag
        // Inactive -> red tag
        const isActive = status === 'Active';
        return (
          <Tag
            color={isActive ? 'green' : 'red'}
            icon={isActive ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
            style={{ fontWeight: 600, padding: '2px 8px', borderRadius: 4 }}
          >
            {status}
          </Tag>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey="id"
      loading={loading}
      // Bonus Challenge C: 5 students per page
      pagination={{
        pageSize: 5,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20'],
        showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} students`,
      }}
      bordered={false}
      className="custom-student-table"
      style={{
        background: '#ffffff',
        borderRadius: 16,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
        overflow: 'hidden',
      }}
    />
  );
};

export default StudentTable;
