import {
    message,
    Card,
    Form,
    DatePicker,
    Divider
  } from 'antd';
  import React, { Component, Fragment } from 'react';
  import { PageHeaderWrapper } from '@ant-design/pro-layout';
  import { connect } from 'dva';
  import moment from 'moment';
  import ReactEcharts from 'echarts-for-react';
  import styles from './style.less';
  import AuthTip from '../../../components/AuthTip';

  const { RangePicker } = DatePicker;

  const pieData = [
      { sendState: 1, smsCount: 10 },
      { sendState: 2, smsCount: 5 },
      { sendState: 3, smsCount: 60 },
      { sendState: 4, smsCount: 44 },
      { sendState: 5, smsCount: 30 },
      { sendState: 6, smsCount: 13 },
      { sendState: 7, smsCount: 20 }
  ];

  const dateFormat = 'YYYY-MM-DD';
const defaultSelectDate = {
  startDate: moment(),
  endDate: moment()
}

  @connect(({ Report, loading }) => ({
    Report,
    loading
  }))
  class Transmittance extends Component {

    state = {
        times: [ defaultSelectDate.startDate, defaultSelectDate.endDate],
        startDate: defaultSelectDate.startDate.format('YYYY-MM-DD'),
        endDate: defaultSelectDate.endDate.format('YYYY-MM-DD')
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
          type: 'Report/fetch',
          payload: {
            startDay: this.state.startDate,
            endDay: this.state.endDate
          }
        });
      }

      timeChange = (time, timeStr) => {
        const { dispatch } = this.props;
          this.setState({
              times: time,
              startDate: timeStr[0],
              endDate: timeStr[1]
          })
          dispatch({
            type: 'Report/fetch',
            payload: {
              startDay: timeStr[0],
              endDay: timeStr[1]
            }
          });
      }

      todayClick = () => {
          this.setState({
            times: [ defaultSelectDate.startDate, defaultSelectDate.endDate]
          }, () => {
            this.timeChange(this.state.times, [
                this.state.times[0].format('YYYY-MM-DD'),
                this.state.times[1].format('YYYY-MM-DD')
            ])
          })
      }
      weekClick = () => {
          this.setState({
              times: [
                moment().week(moment().week()).startOf('week'),
                moment().week(moment().week()).endOf('week')
              ]
          }, () => {
            this.timeChange(this.state.times, [
                this.state.times[0].format('YYYY-MM-DD'),
                this.state.times[1].format('YYYY-MM-DD')
            ])
          })
      }
      monthClick = () => {
          this.setState({
              times: [
                moment().month(moment().month()).startOf('month'),
                moment().month(moment().month()).endOf('month')
              ]
          }, () => {
            this.timeChange(this.state.times, [
                this.state.times[0].format('YYYY-MM-DD'),
                this.state.times[1].format('YYYY-MM-DD')
            ])
          })
      }
      yearClick = () => {
          this.setState({
              times: [
                moment().year(moment().year()).startOf('year'),
                moment().year(moment().year()).endOf('year')
              ]
          }, () => {
            this.timeChange(this.state.times, [
                this.state.times[0].format('YYYY-MM-DD'),
                this.state.times[1].format('YYYY-MM-DD')
            ])
          })
      }

      render () {
        const {
            Report: { data },
            loading,
          } = this.props;
          let list = data.list;
          let unSend = list.filter(item => item.sendState == 1);
          let unknow = list.filter(item => item.sendState == 3);
          let fail = list.filter(item => item.sendState == 4);
          let suc = list.filter(item => item.sendState == 5);
          let black = list.filter(item => item.sendState == 6);
          let inte = list.filter(item => item.sendState == 7);
          let una = list.filter(item => item.sendState == 8);
          let smsList = [
            {value: unknow.length == 1 ? unknow[0].smsCount : 0, name:'未知'},
            {value: unSend.length == 1 ? unSend[0].smsCount : 0, name:'未发送'},
            {value: fail.length == 1 ? fail[0].smsCount : 0, name:'发送失败'},
            {value: suc.length == 1 ? suc[0].smsCount : 0, name:'发送成功'},
            {value: black.length == 1 ? black[0].smsCount : 0, name:'黑名单'},
            {value: inte.length == 1 ? inte[0].smsCount : 0, name:'拦截'},
            {value: una.length == 1 ? una[0].smsCount : 0, name:'审核失败'}
          ];

          const getOptionPie = pieData => {
              return {
                height: 'shine',
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'right',
                    data:['未发送','未知','发送失败','发送成功','黑名单', '拦截', '审核失败'],
                    formatter:  function(name){
                        var total = 0;
                        var target = 0;
                        for (var i = 0, l = smsList.length; i < l; i++) {
                        total += smsList[i].value;
                        if (smsList[i].name == name) {
                            target = smsList[i].value;
                            }
                        }
                        return name + ' ' + target + '  ' + (total > 0 ? ((target/total)*100).toFixed(2) : 0) + '%';
                    }
                },
                series: [
                    {
                        name:'状态',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: smsList
                    }
                ]

              };
          };

          return (
            <PageHeaderWrapper>
              <AuthTip {...this.props}></AuthTip>
                <Card bordered={false}>
                    <div style={{
                        float: 'right',
                        paddingBottom: '20px'
                    }}>
                        <span style={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            paddingRight: '15px',
                            cursor: 'pointer'
                        }} onClick={ this.todayClick}>今日</span>
                        <span style={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            paddingRight: '15px',
                            cursor: 'pointer'
                        }} onClick={ this.weekClick}>本周</span>
                        <span style={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            paddingRight: '15px',
                            cursor: 'pointer'
                        }} onClick={this.monthClick}>本月</span>
                        <span style={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            paddingRight: '15px',
                            cursor: 'pointer'
                        }} onClick={this.yearClick}>全年</span>
                        <RangePicker value={ this.state.times } allowClear={false} onChange={this.timeChange} defaultValue={[defaultSelectDate.startDate, defaultSelectDate.endDate]} />
                    </div>
                    <Divider/>
                    <ReactEcharts
                        theme="shine"
                        option={ getOptionPie(pieData) }
                        style={{
                            height: 480
                        }}
                    />
                </Card>
            </PageHeaderWrapper>
          )
      }
  }

  export default Form.create()(Transmittance)