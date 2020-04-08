import React, { useState } from 'react';
import { Button, Form, Modal, Select, Tabs, Tooltip } from 'antd';
import {
  ShareAltOutlined,
  UserSwitchOutlined,
  TeamOutlined,
  LinkOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import './modals.styles.less';
import {
  getProjectItemType,
  ProjectType,
} from '../../features/project/constants';
import ShareProjectItemWithGroup from '../../features/share-project-item/share-item-with-group';
import ShareProjectItemWithUser from '../../features/share-project-item/share-item-with-user';
import ShareProjectItemGenerateLink from '../../features/share-project-item/share-item-generate-link';
import ShareProjectItemManagement from '../../features/share-project-item/share-item-management';
import { getTaskSharables } from '../../features/tasks/actions';
import { getNoteSharables } from '../../features/notes/actions';

const { TabPane } = Tabs;
const { Option } = Select;

type ProjectItemProps = {
  mode: string;
  type: ProjectType;
  projectItemId: number;
  getTaskSharables: (taskId: number) => void;
  getNoteSharables: (noteId: number) => void;
};

const ShareProjectItem: React.FC<ProjectItemProps> = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const { mode } = props;

  const getSharablesCall: { [key in ProjectType]: Function } = {
    [ProjectType.NOTE]: props.getNoteSharables,
    [ProjectType.TODO]: props.getTaskSharables,
    [ProjectType.LEDGER]: () => {},
  };

  const getSharablesFunction = getSharablesCall[props.type];

  const handleCancel = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    setVisible(false);
  };

  const openModal = () => {
    setVisible(true);
  };

  const handleTabClick = (key: string) => {
    if (key === 'Manage') {
      getSharablesFunction(props.projectItemId);
    }
  };

  const getModal = () => {
    return (
      <Modal
        title={`SHARE ${getProjectItemType(props.type)}`}
        destroyOnClose
        centered
        visible={visible}
        onCancel={(e) => handleCancel(e)}
        footer={false}
      >
        <div>
          <Tabs
            defaultActiveKey="Group"
            tabPosition={'left'}
            onTabClick={(k: string) => handleTabClick(k)}
          >
            <TabPane
              tab={
                <Tooltip title="Group">
                  <TeamOutlined className="large-icon" />
                </Tooltip>
              }
              key="Group"
            >
              <ShareProjectItemWithGroup
                type={props.type}
                projectItemId={props.projectItemId}
              />
            </TabPane>
            <TabPane
              tab={
                <Tooltip title="User">
                  <UserSwitchOutlined className="large-icon" />
                </Tooltip>
              }
              key="User"
            >
              <ShareProjectItemWithUser
                type={props.type}
                projectItemId={props.projectItemId}
              />
            </TabPane>
            <TabPane
              tab={
                <Tooltip title="Link">
                  <LinkOutlined className="large-icon" />
                </Tooltip>
              }
              key="Link"
            >
              <ShareProjectItemGenerateLink
                type={props.type}
                projectItemId={props.projectItemId}
              />
            </TabPane>
            <TabPane
              tab={
                <Tooltip title="Manage">
                  <ToolOutlined className="large-icon" />
                </Tooltip>
              }
              key="Manage"
            >
              <ShareProjectItemManagement
                type={props.type}
                projectItemId={props.projectItemId}
              />
            </TabPane>
          </Tabs>
        </div>
      </Modal>
    );
  };

  const getDiv = () => {
    if (mode === 'div') {
      return (
        <div onClick={openModal} className="popover-control-item">
          <span>Share</span>
          <ShareAltOutlined />
          {getModal()}
        </div>
      );
    }
    return (
      <Tooltip title={`SHARE ${getProjectItemType(props.type)}`}>
        <div>
          <span onClick={openModal}>
            <ShareAltOutlined />
            {getModal()}
          </span>
        </div>
      </Tooltip>
    );
  };

  return getDiv();
};

export default connect(null, {
  getTaskSharables,
  getNoteSharables,
})(ShareProjectItem);
