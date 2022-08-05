import React, { useEffect, useMemo, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { PageHeader, Steps, Button, message } from 'antd';
import StepBaseForm from '../../components/news-manage/StepBaseForm';
import ContentEditor from '../../components/news-manage/ContentEditor';
import { connect } from 'react-redux';
import { postNews, getDraftDetail } from '../../api/news-manage';

const { Step } = Steps;

function AddOrEdit({ userInfo, match, history }) {
  const [current, setCurrent] = useState(0);
  const [formInstance, setFormInstance] = useState(null);
  const [currentBaseForm, setCurrentBaseForm] = useState(null);
  // 编辑器内容
  const [html, setHtml] = useState('');
  const steps = [
    { title: '基本信息', description: '新闻标题、新闻分类' },
    { title: '新闻内容', description: '新闻主题内容' },
    { title: '新闻提交', description: '保存草稿或提交审核' }
  ];

  const next = () => {
    switch (current) {
      case 0:
        formInstance.validateFields().then(values => {
          setCurrentBaseForm(values);
          setCurrent(current + 1);
        });
        break;
      case 1:
        setCurrent(current + 1);
        break;
      default:
        break;
    }
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  // 审核 or 草稿箱
  const saveHandler = async auditState => {
    const payload = {
      region: userInfo.region,
      author: userInfo.username,
      roleId: userInfo.roleId,
      auditState, // 0 草稿箱 1 审核
      publishState: 0,
      createTime: Date.now(),
      star: 0,
      view: 0,
      publishTime: Date.now(),
      ...currentBaseForm,
      content: html
    };
    await postNews({ data: payload });
    message.success('文章提交成功');
    // todo 跳转页面
    auditState ? history.push('') : history.push('/news-manage/draft');
  };

  const title = useMemo(() => (match.params.id ? '编辑新闻' : '撰写新闻'), [match.params.id]);
  useEffect(() => {
    if (match.params.id) {
      getDraftDetail(match.params.id).then(res => {
        if (!currentBaseForm) {
          formInstance && formInstance.setFieldsValue({ title: res.title, categoryId: res.categoryId });
        }
        setHtml(res.content);
      });
    }
  }, [match.params.id, formInstance, currentBaseForm]);

  // 表单和 editor 的内容填充
  useEffect(() => {
    if (currentBaseForm) {
      formInstance.setFieldsValue(currentBaseForm);
    }
  }, [formInstance, currentBaseForm]);
  useEffect(() => {
    if (html) {
      setHtml(html);
    }
  }, [html]);

  const nextButton = (
    <Button type="primary" size="mini" onClick={next}>
      下一步
    </Button>
  );
  const prevButton = (
    <Button type="primary" size="mini" onClick={prev} style={{ marginLeft: 10 }}>
      上一步
    </Button>
  );
  return (
    <>
      <PageHeader title={title} />
      <Steps size="small" current={current}>
        {steps.map(item => (
          <Step title={item.title} description={item.description} key={item.title} />
        ))}
      </Steps>

      <div style={{ marginTop: 20 }}>
        {current === 0 ? (
          <StepBaseForm getForm={formInstance => setFormInstance(formInstance)} />
        ) : current === 1 ? (
          <ContentEditor html={html} setHtml={content => setHtml(content)} />
        ) : (
          ''
        )}
      </div>

      <div style={{ marginTop: 20 }}>
        {current === 0 && nextButton}
        {current === 1 && (
          <>
            {nextButton} {prevButton}
          </>
        )}
        {current === 2 && (
          <>
            {prevButton}
            <Button type="primary" size="mini" onClick={() => saveHandler(0)} style={{ marginLeft: 10 }}>
              保存到草稿
            </Button>
            <Button type="primary" size="mini" onClick={() => saveHandler(1)} style={{ marginLeft: 10 }}>
              发布
            </Button>
          </>
        )}
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    userInfo: state.loginReducer.userInfo[0]
  };
};

export default connect(mapStateToProps, null)(withRouter(AddOrEdit));
