import Navbar from '../../../components/Navbar'
import {
  Form,
  Button,
  Input,
  TextArea,
  Radio,
  Space,
  DatePicker,
} from 'antd-mobile'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserProfile, updataUser } from '../../../store/action/profile'
import { useHistory } from 'react-router-dom'
export default function EditInfo() {
  const history = useHistory()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserProfile())
  }, [dispatch])
  const [visible, setVisible] = useState(false)
  const data = useSelector((state) => state.profile.privateUser)
  const { name, intro, gender, birthday } = data
  return (
    <div className="">
      <Navbar>修改资料</Navbar>
      <Form
        onFinish={(data) => {
          const user = {
            ...data,
            birthday: data.birthday
              ? `${data.birthday.getFullYear()}-${
                  data.birthday.getMonth() + 1
                }-${data.birthday.getDate()}`
              : undefined,
          }
          // console.log(user)
          // return user
          dispatch(updataUser(user))
          history.push('/profile/edit')
        }}
        layout="horizontal"
        footer={
          <Button block type="submit" color="warning" size="large">
            确认修改
          </Button>
        }
      >
        <Form.Item
          name="name"
          label="昵称"
          rules={[{ required: true, message: '姓名不能为空' }]}
          initialValue={name}
          // value={name}
        >
          <Input onChange={() => console.log()} placeholder="请输入昵称" />
        </Form.Item>
        <Space></Space>
        <Form.Item name="info" label="简介" initialValue={intro}>
          <TextArea
            placeholder="请输入你的介绍"
            maxLength={20}
            rows={2}
            showCount
          />
        </Form.Item>
        <Form.Item
          initialValue={gender}
          name="gender"
          label="性别"
          rules={[{ required: true, message: '请勾选性别' }]}
        >
          <Radio.Group>
            <Space direction="vertical">
              <Radio value="0">男</Radio>
              <Radio value="1">女</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          initialValue={new Date(birthday)}
          name="birthday"
          label="生日"
          trigger="onConfirm"
          onClick={() => {
            setVisible(true)
          }}
          // onConfirm={(value) => {
          //   console.log(value, 'value')
          // }}
          // extra={birthday}
        >
          <DatePicker
            visible={visible}
            onClose={() => {
              setVisible(false)
            }}
            max={new Date()}
            min={new Date('1900/01/01')}
            initialValue={new Date('1900/01/01')}
          >
            {(value) => {
              return value ? value.toLocaleDateString() : ''
            }}
          </DatePicker>
        </Form.Item>
      </Form>
    </div>
  )
}
