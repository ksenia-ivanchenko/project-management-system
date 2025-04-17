import React from 'react';
import { Card, Avatar, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { TaskType } from '../model/types';
import styles from './task.module.scss';
import { priorityColors, statusColors } from '../const/colors';

type TaskCardProps = {
  task: TaskType;
};

export const TaskCard = ({ task }: TaskCardProps) => (
  <Card hoverable title={task.title} className={styles.card}>
    <div className={styles.header}>
      <Avatar src={task.assignee.avatarUrl} icon={<UserOutlined />} />
      <span>{task.assignee.fullName}</span>
    </div>
    <p>{task.description}</p>
    <Tag color={priorityColors[task.priority]}>{task.priority}</Tag>
    <Tag color={statusColors[task.status]}>{task.status}</Tag>
  </Card>
);
