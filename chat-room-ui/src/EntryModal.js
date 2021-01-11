import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

export function EntryModal({ setUserName }) {
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(true);

	const handleSubmit = () => {
		form
			.validateFields()
			.then((values) => {
				console.log(values.nickname);
				setUserName(values.nickname);
				form.resetFields();
			})
			.catch((info) => {
				console.log('Validation Failed:', info);
			})
		setVisible(false);
	}

	return (
		<Modal
			visible={visible}
			title="Welcome to Nick's room"
			closable={false}
			keyboard={false}
			footer={null}
			centered
		>
			<Form
				form={form}
				layout='vertical'
				name='entry_form'
			>
				<Form.Item
					name='nickname'
					label='Nickname'
					tooltip='Enter your nickname to join the room.'
					rules={[
						{
							required: true,
							message: 'Please input your nickname.'
						}
					]}
				>
					<Input placeholder='guest' />
				</Form.Item>
				<Form.Item>
					<Button type='primary' onClick={handleSubmit}>Go to Chat</Button>
				</Form.Item>
			</Form>
		</Modal>
	)
}

