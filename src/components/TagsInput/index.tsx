import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Input, Space, Tag, theme, Tooltip } from 'antd';

interface IProps {
	setListEmail: (value: string[]) => void
	emails: any[];
	reset: number
}

const TagsInput = ({ setListEmail, emails, reset }: IProps) => {
	const { token } = theme.useToken();
	const [tags, setTags] = useState<any>([]);
	const [inputVisible, setInputVisible] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [editInputIndex, setEditInputIndex] = useState(-1);
	const [editInputValue, setEditInputValue] = useState('');
	const inputRef = useRef<InputRef>(null);
	const editInputRef = useRef<InputRef>(null);

	const [error, setError] = useState<string>('');

	useEffect(() => {
		if (reset === 0) setTags([]);
	}, [reset]);

	useEffect(() => {
		if (inputVisible) {
			inputRef.current?.focus();
		}
	}, [inputVisible]);

	useEffect(() => {
		editInputRef.current?.focus();
	}, [editInputValue]);

	const handleClose = (removedTag: string) => {
		const newTags = tags.filter((tag: any) => tag !== removedTag);
		setTags(newTags);
		setListEmail(newTags);
	};

	const showInput = () => {
		setInputVisible(true);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const email = e.target.value;
		setInputValue(e.target.value);
	};

	const handleInputConfirm = () => {

		console.log('emails ', emails)
		const findEmail = emails.find((item: any) => item.email === inputValue);

		const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

		if (findEmail) {
			setError('Email ya existe en la lista de agregados.');
			return false;
		}

		if (!inputValue.match(validRegex)) {
			setError('Email invalido.');
			return false;
		}

		if (inputValue && !tags.includes(inputValue)) {
			setTags([...tags, inputValue]);
			setListEmail([...tags, inputValue]);
		}
		setInputVisible(false);
		setInputValue('');
		setError('');
	};

	const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditInputValue(e.target.value);
	};

	const handleEditInputConfirm = () => {
		const newTags = [...tags];
		newTags[editInputIndex] = editInputValue;
		setTags(newTags);
		setEditInputIndex(-1);
		setEditInputValue('');
	};

	const tagInputStyle: React.CSSProperties = {
		width: 'auto',
		height: 22,
		marginInlineEnd: 8,
		verticalAlign: 'top',
	};

	const tagPlusStyle: React.CSSProperties = {
		height: 22,
		background: token.colorBgContainer,
		borderStyle: 'dashed',
	};

	return (
		<div className=''>
			<Space size={[0, 8]} wrap>
				{tags.map((tag: any, index: number) => {

					const isLongTag = tag.length > 20;
					const tagElem = (
						<Tag
							key={tag}
							closable={true}
							style={{ userSelect: 'none' }}
							onClose={() => handleClose(tag)}
						>
							<span
								className='text-xs'
								onDoubleClick={(e) => {
									if (index !== 0) {
										setEditInputIndex(index);
										setEditInputValue(tag);
										e.preventDefault();
									}
								}}
							>
								{isLongTag ? `${tag.slice(0, 20)}...` : tag}
							</span>
						</Tag>
					);
					return isLongTag ? (
						<Tooltip title={tag} key={tag}>
							{tagElem}
						</Tooltip>
					) : (
						tagElem
					);
				})}
				{inputVisible ? (
					<Input
						ref={inputRef}
						type="text"
						size="small"
						style={tagInputStyle}
						value={inputValue}
						onChange={handleInputChange}
						onPressEnter={handleInputConfirm}
					/>
				) : (
					<Tag style={tagPlusStyle} icon={<PlusOutlined />} onClick={showInput}>
						Agregar nuevo email
					</Tag>
				)}
			</Space>
			{error.length > 0 && <span className=' absolute left-0 -bottom-5 text-xs text-danger'>{error}</span>}
		</div>
	);
};

export default TagsInput;