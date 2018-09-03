import React, { Component } from 'react';
import { Table, Segment, Dropdown, Button, Icon, Header, Grid, Input, Menu, Label, Pane, Modal, Container, GridColumn } from 'semantic-ui-react'
import * as moment from 'moment';

import hackatonApi from "../../apis/hackaton";

import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

import './adminComponent.css';

class AdminComponent extends Component {
  state = {
    loading: true,
    unknowns: [],
    results: {
      total: 0,
      positive: 0,
      negative: 0,
      neutral: 0,
      unproccess: 0,
    },
    searchCriteria: ''
  }

  componentDidMount = () => {
    hackatonApi.getCriteria().then(c => {
      hackatonApi.getUknowns().then(u => {      
        hackatonApi.getTotal().then(r => {
          hackatonApi.getNegative().then(n => {
            hackatonApi.getNeutral().then(neu => {
              hackatonApi.getPositive().then(p => {
                hackatonApi.getUnproccess().then(un => {
                  this.setState({ unknowns: u, loading: false, searchCriteria: c, results: {... this.state.results, total: r, negative: n, neutral: neu, positive: p, unproccess: un}});
                })
              });
            });
          });
        });
      });
    });
  }

  handleFind = () => {

  }

  handleLearnSelectedType = (e, { value }) => this.setState({ value })

  render() {
    const options = [
      { key: 1, text: 'Positive', value: 1 },
      { key: 2, text: 'Negative', value: 2 },
      { key: 3, text: 'Neutral', value: 3 },
    ]
    const sinEvaluar = this.state.unknowns;
    let { total, positive, negative, neutral, unproccess } = this.state.results;
    total = total - unproccess - sinEvaluar.length;
    
    return (
      <div className="admin">
        <Segment.Group>
          <Header className='title' as='h1' icon='lightbulb outline' content='Hackaton' />
          <Grid className="grilla" columns={2}>
            <Grid.Row stretched>
              <Grid.Column width={7}>
                <Segment raised loading={this.state.loading}>
                  <Header className="searchBar" as='h2' icon textAlign='center'>
                    <Icon name='twitter' circular />
                    <Header.Content>Twitter</Header.Content>
                  </Header>
                  <Container textAlign='center'>
                    <Input value={this.state.searchCriteria} fluid size='massive' icon='hashtag' iconPosition='left' placeholder='Search ...' action={{ content: 'Find', onClick: this.handleFind }} />
                  </Container>
                </Segment>
              </Grid.Column>
              <Grid.Column width={3}> 
                <Segment loading={this.state.loading}>
                  <Grid columns={2}>
                    <Grid.Row>
                      <Grid.Column width={8}>
                        <Progress type="circle"
                            strokeWidth={4}
                            percent={Math.round(positive/total*100)}
                            theme={{
                              active: {
                                color: 'green',
                                trailColor: 'lightgrey',
                                symbol: Math.round(positive/total*100) +'%',
                              }                      
                            }}
                          />
                        </Grid.Column>
                        <Grid.Column className="numbersDetails" width={4}>
                          <Header color='green' as='h3'>{positive}</Header>
                          <Header as='h4'>Positivos</Header>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                </Segment>
              </Grid.Column>
              <Grid.Column width={3}> 
                <Segment loading={this.state.loading}>
                  <Grid columns={2}>
                    <Grid.Row>
                      <Grid.Column width={8}>
                        <Progress type="circle"
                            strokeWidth={4}
                            percent={Math.round(negative/total*100)}
                            theme={{
                              active: {
                                color: 'red',
                                trailColor: 'lightgrey',
                                symbol: Math.round(negative/total*100)+'%',
                              },
                              success: {
                                color: 'red',
                                symbol: '100%',                               
                              }                                 
                            }}
                          />
                        </Grid.Column>
                        <Grid.Column className="numbersDetails" width={4}>
                          <Header color='red' as='h3'>{negative}</Header>
                          <Header as='h4'>Negativos</Header>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                </Segment>
              </Grid.Column>
              <Grid.Column width={3}> 
              <Segment loading={this.state.loading}>
                  <Grid columns={2}>
                    <Grid.Row>
                      <Grid.Column width={8}>
                        <Progress type="circle"
                            strokeWidth={4}
                            percent={Math.round(neutral/total*100)}
                            theme={{
                              
                              active: {
                                color: 'grey',
                                trailColor: 'lightgrey',
                                symbol: Math.round(negative/total*100)+'%',
                              }                            
                            }}
                          />
                        </Grid.Column>
                        <Grid.Column className="numbersDetails" width={4}>
                          <Header color='red' as='h3'>{neutral}</Header>
                          <Header as='h4'>Neutrales</Header>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>                      
              <Table singleLine>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Id</Table.HeaderCell>
                    <Table.HeaderCell>Texto</Table.HeaderCell>
                    <Table.HeaderCell>Learn as</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {sinEvaluar.map((item, i) => {                   
                    return <Table.Row key={i}>
                      <Table.Cell>{item.id}</Table.Cell>
                      <Table.Cell>{item.text}</Table.Cell>
                      <Table.Cell><Dropdown text='Select type' options={options} simple item /></Table.Cell>
                    </Table.Row>
                  })
                  }                                
                </Table.Body>
              </Table>
              </Grid.Column>
          </Grid.Row>
          </Grid>
        </Segment.Group>
      </div>
    )
  }
}

export default AdminComponent;