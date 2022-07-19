import {useState, useEffect} from 'react'
import {deleteUser, getAllUsers} from "./user";
import {
    Layout,
    Menu,
    Breadcrumb,
    Table,
    Spin,
    Empty,
    Button, Popconfirm, Radio,
} from 'antd';

import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    LoadingOutlined,
    PlusOutlined
} from '@ant-design/icons';
import NewUserDrawerForm from "./frontComponents/newUserDrawerForm";
import openNotificationWithIcon, {errorNotification, successNotification} from "./frontComponents/Notification";
import './App.css';

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;
const removeUser = (userId, callback) => {
    deleteUser(userId).then(
        () => {
            successNotification("user deleted", 'User with ${userId} was deleted');
            callback();
        }
    );
}

const columns = fetchUsers =>[
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (text, user)=>
            <Radio.Group>
                <Popconfirm
                    title={'Are you sure to delete? ${student.name}'}
                    placement={"topRight"}
                    onConfirm={()=> removeUser(user.id, fetchUsers)}
                    okText={'tak'}
                    cancelText={'nie'}>
                    <Radio.Button value={'small'}>Delete</Radio.Button>
                </Popconfirm>
                <Radio.Button>Edit</Radio.Button>
            </Radio.Group>
    }
];

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

function App() {
    const [users, setUsers] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);

    const fetchUsers = () =>
        getAllUsers()
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUsers(data);
                setFetching(false);
            }).catch(err => {
                console.log(err.response)
                err.response.json().then(res =>{
                    console.log(res);
                    errorNotification("there was an issue", res.message())
                })
        })

    useEffect(() => {
        console.log("component is mounted");
        fetchUsers();
    }, []);

    const renderStudents = () => {
        if (fetching) {
            return <Spin indicator={antIcon}/>
        }
        if (users.length <= 0) {
            return <Empty/>;
        }
        return <>
            <NewUserDrawerForm
                showDrawer={showDrawer}
                setShowDrawer={setShowDrawer}
                fetchUsers={fetchUsers}
            />
            <Table
                dataSource={users}
                columns={columns(fetchUsers)}
                bordered
                title={() =>
                    <Button
                        onClick={() => setShowDrawer(!showDrawer)}
                        type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                        Add New Student
                    </Button>
                }
                pagination={{pageSize: 50}}
                scroll={{y: 500}}
                rowKey={student => student.id}
            />
        </>

    }

    return <Layout style={{minHeight: '100vh'}}>
        {/*sidebar section*/}
        <Sider collapsible collapsed={collapsed}
               onCollapse={setCollapsed}>
            <div className="logo"/>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined/>}>
                    Option 1
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined/>}>
                    Option 2
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined/>} title="User">
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined/>} title="Team">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9" icon={<FileOutlined/>}>
                    Files
                </Menu.Item>
            </Menu>
        </Sider>
        {/*content section*/}
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{padding: 0}}/>
            <Content style={{margin: '0 16px'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                    {renderStudents()}
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>By @Boro</Footer>
        </Layout>
    </Layout>
}

export default App;