import React, { useState, useContext } from 'react';
import { Layout, Menu, List, Typography, Input } from 'antd';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';

import { MessageContext } from './Store';
import { EntryModal } from './EntryModal';

const { Content, Sider } = Layout;

const StyledLayout = styled(Layout)`
	padding: 24px 24px;
	height: 100%;
`;

const StyledContent = styled(Content)`
	padding: 0 24px;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

const ChatHeader = styled.div`
	padding: 0 24px;
`

const ChatList = styled(List)`
	width: 100%;
	padding-bottom: 6px;
	height: clac(100% - 15px);
	overflow: scroll;
	overflow-x: hidden;
	
	display: flex;
	flex-direction: column-reverse;
`

const ChatInput = styled(Input)`

`

export default function DashBoard() {
	const { allChats, sendWSMessage } = useContext(MessageContext);
	const [text, setText] = useState('');
	const [userName, setUserName] = useState('guest');
	const [activeTopic, setActiveTopic] = useState('general');

	const handleSubmit = (e) => {
		sendWSMessage({
			'from': userName,
			'msg': e.target.value,
			'topic': activeTopic,
		});
		setText('');
	}

	return (
		<StyledLayout>
			<EntryModal setUserName={setUserName} />
			<Sider width={200}>
				<Menu
					mode="inline"
					defaultSelectedKeys={['general']}
					style={{ height: '100%' }}
					onSelect={({ selectedKeys }) => {
						console.log(selectedKeys);
						setActiveTopic(selectedKeys.toString());
					}}
				>
					{Object.keys(allChats).map((elem) => (
						<Menu.Item key={elem}>{elem}</Menu.Item>
					))}
				</Menu>
			</Sider>
			<StyledContent>
				<ChatList
					bordered
					dataSource={allChats[activeTopic]}
					renderItem={({ from, msg }) => (
						<List.Item>
							<Typography.Text mark>{from}</Typography.Text> {msg}
						</List.Item>
					)}
				/>
				{/* <ChatHeader>{activeTopic.toUpperCase()}</ChatHeader> */}
				<ChatInput
					value={text}
					onChange={(e) => setText(e.target.value)}
					onPressEnter={handleSubmit}
				/>
			</StyledContent>
		</StyledLayout>
	)
}