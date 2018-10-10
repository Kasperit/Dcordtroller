import React, { Fragment, Component } from "react";
import { List, Card, Icon, Col, Row } from "antd";
import "./ListServer.css";

const ListServer = props => {
  let { listServer, server } = props;
  return (
    <Col style={{ height: "100%" }} span={10}>
      <Card
        title="Servers"
        headStyle={{
          backgroundColor: "#C1BBBC",
          textAlign: "center",
          height: 95
        }}
        bodyStyle={{ backgroundColor: "#eee" }}
        style={{ height: "100%", backgroundColor: "#eee" }}
      >
        <List
          bordered
          dataSource={listServer}
          renderItem={item => (
            <List.Item
              onClick={() => props.chooseServer(item)}
              actions={[<Icon type="right" />]}
              className={server === item ? "list-server-active" : "list-server"}
            >
              {item}
            </List.Item>
          )}
        />
      </Card>
    </Col>
  );
};

export default ListServer;
