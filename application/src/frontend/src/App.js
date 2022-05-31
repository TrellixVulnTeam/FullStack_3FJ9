import { useState, useEffect } from 'react'
import { getAllUsers } from "./user";
import {
    Layout,
    Menu,
    Breadcrumb,
    Table, Empty, Spin
} from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    LoadingOutlined
} from '@ant-design/icons';
import './App.css';

// constants
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const columns = [
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
    }
];

const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 24,
        }}
        spin
    />
);

// main app
function App() {

    //initial state
    const [users, setUsers] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);

    const fetchUsers = () =>
        getAllUsers()
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUsers(data);
                setFetching(false);
            });

    // fetch users on load
    useEffect(() => {
        console.log('useEffect');
        fetchUsers();
    }, []);

    const renderUsers = users => {
        if(users.length<=0)
            return <Empty>There are no users</Empty>;
        if(fetching)
            return  <Spin indicator={antIcon} />;
        return (
            <Table
                columns={columns}
                dataSource={users}
                pagination={true}
                bordered={true}
                title={() => 'Users'}
                pagination={{ pageSize: 50 }}
                scroll={{ y: 240 }}
                rowKey={(user => user.id)}
            />
        );

    }
    // display users
    return <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed}
               onCollapse={setCollapsed}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                    Option 1
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />}>
                    Option 2
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9" icon={<FileOutlined />}>
                    Files
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    {renderUsers(users)}

                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>By @Boro</Footer>
        </Layout>
    </Layout>

}

export default App;