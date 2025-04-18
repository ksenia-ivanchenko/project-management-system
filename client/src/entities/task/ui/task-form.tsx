import { z } from 'zod';
import { Priority, Status } from '../model/types';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Input, Select } from 'antd';
import { BoardType } from '@entities/board';
import { User } from '@entities/user';

const taskFormSchema = z.object({
  title: z.string().min(1, 'Название обязательно'),
  description: z
    .string()
    .min(1, 'Описание обязательно')
    .max(500, 'Максимум 500 символов'),
  boardId: z.number({ invalid_type_error: 'Выберите проект' }),
  priority: z.nativeEnum(Priority).optional(),
  status: z.nativeEnum(Status, {
    errorMap: () => ({ message: 'Выберите статус' }),
  }),
  assigneeId: z.number({ invalid_type_error: 'Выберите исполнителя' }),
});

type TaskFormSchema = z.infer<typeof taskFormSchema>;

type TaskFormProps = {
  boards: BoardType[];
  users: User[];
  defaultValues?: Partial<TaskFormSchema>;
  onSubmit: (data: TaskFormSchema) => void;
};

export const TaskForm = ({
  boards,
  users,
  defaultValues,
  onSubmit,
}: TaskFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormSchema>({
    defaultValues,
    resolver: zodResolver(taskFormSchema),
  });

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
      id="task-form"
    >
      <Form.Item
        label="Название"
        validateStatus={errors.title ? 'error' : ''}
        help={errors.title?.message}
      >
        <Controller
          name="title"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="Описание"
        validateStatus={errors.description ? 'error' : ''}
        help={errors.description?.message}
      >
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Input.TextArea {...field} rows={4} showCount maxLength={500} />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Проект"
        validateStatus={errors.boardId ? 'error' : ''}
        help={errors.boardId?.message}
      >
        <Controller
          name="boardId"
          control={control}
          render={({ field }) => (
            <Select {...field} placeholder="Выберите проект">
              {boards.map((board) => (
                <Select.Option key={board.id} value={board.id}>
                  {board.name}
                </Select.Option>
              ))}
            </Select>
          )}
        />
      </Form.Item>

      <Form.Item
        label="Приоритет"
        validateStatus={errors.priority ? 'error' : ''}
        help={errors.priority?.message}
      >
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <Select {...field} placeholder="Выберите приоритет" allowClear>
              {Object.values(Priority).map((level) => (
                <Select.Option key={level} value={level}>
                  {level}
                </Select.Option>
              ))}
            </Select>
          )}
        />
      </Form.Item>

      <Form.Item
        label="Статус"
        validateStatus={errors.status ? 'error' : ''}
        help={errors.status?.message}
      >
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select {...field} placeholder="Выберите статус">
              {Object.values(Status).map((status) => (
                <Select.Option key={status} value={status}>
                  {status}
                </Select.Option>
              ))}
            </Select>
          )}
        />
      </Form.Item>

      <Form.Item
        label="Исполнитель"
        validateStatus={errors.assigneeId ? 'error' : ''}
        help={errors.assigneeId?.message}
      >
        <Controller
          name="assigneeId"
          control={control}
          render={({ field }) => (
            <Select {...field} placeholder="Выберите исполнителя">
              {users.map((user) => (
                <Select.Option key={user.id} value={user.id}>
                  {user.fullName}
                </Select.Option>
              ))}
            </Select>
          )}
        />
      </Form.Item>
    </Form>
  );
};
