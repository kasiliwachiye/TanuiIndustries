import React, { useState, useEffect } from 'react'
import { Container, Grid, Form, Segment, Button, Header, Table, Icon } from "semantic-ui-react";
import firebase from './firebase';

const FirebaseCRUD = () => {
    const [createIndex, setCreateIndex] = useState('')
    const [createItem, setCreateItem] = useState('')
    const [createQuantity, setCreateQuantity] = useState('')
    const [inventoryData, setInventoryData] = useState([])
    const [updateIndex, setUpdateIndex] = useState('')
    const [updateItem, setUpdateItem] = useState('')
    const [updateQuantity, setUpdateQuantity] = useState('')
    const [itemID, setItemID] = useState('')

    useEffect(() => {
        const firestore = firebase.database().ref("/NewInventory")
        firestore.on("value", (response) => {
            const data = response.val();
            let newInventory = []
            for (let id in data) {
                newInventory.push({                    
                    id: id,
                    Index: data[id].Index,
                    Item: data[id].Item,
                    Quantity: data[id].Quantity
                })
            }
            setInventoryData(newInventory)
        })
    }, [])

    const handleAddInventory = () => {
        const firestore = firebase.database().ref("/NewInventory")
        let data = {
            Index: createIndex,
            Item: createItem,
            Quantity: createQuantity
        }
        firestore.push(data)
        setCreateIndex('')
        setCreateItem('')
        setCreateQuantity('')
    }

    const handleUpdateInventory = () => {
        const firestore = firebase.database().ref("/NewInventory").child(itemID)
        firestore.update({
            Index: updateIndex,
            Item: updateItem,
            Quantity: updateQuantity
        })
        setUpdateIndex('')
        setUpdateItem('')
        setUpdateQuantity('')
    }

    const handleUpdateClick = (data) => {
        setUpdateIndex(data.Index)
        setUpdateItem(data.Item)
        setUpdateQuantity(data.Quantity)
        setItemID(data.id)
    }

    const handleDelete = (id) => {
        const firestore = firebase.database().ref("/NewInventory").child(id)
        firestore.remove()
    }

    return (
        <div className="ui hidden divider">
            <Container>
                <Header textAlign='center'>TANUI INDUSTRIES INVENTORY MANAGEMENT SYSTEM</Header>
                <hr/>
                <br/>
                <Grid>
                    <Grid.Row columns="2">
                        <Grid.Column>
                            <Segment padded='very'>
                                <Header>ADD TO INVENTORY</Header>
                                <Form>
                                    <Form.Field>
                                        <label>Index</label>
                                        <input placeholder="Index" focus value={createIndex} onChange={(e) => setCreateIndex(e.target.value)} ></input>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Item</label>
                                        <input placeholder="Item" focus value={createItem} onChange={(e) => setCreateItem(e.target.value)} ></input>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Quantity</label>
                                        <input placeholder="Quantity" focus value={createQuantity} onChange={(e) => setCreateQuantity(e.target.value)} ></input>
                                    </Form.Field>
                                    <Form.Field>
                                        <Button onClick={() => {handleAddInventory()}} positive>
                                            <Icon name="add circle"></Icon>
                                            Add
                                        </Button>
                                    </Form.Field>
                                </Form>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment padded='very'>
                                <Header>UPDATE INVENTORY DETAILS</Header>
                                    <Form>
                                        <Form.Field>
                                            <label>Index</label>
                                            <input placeholder="Index" focus value={updateIndex} onChange={(e) => setUpdateIndex(e.target.value)} ></input>
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Item</label>
                                            <input placeholder="Item" focus value={updateItem} onChange={(e) => setUpdateItem(e.target.value)} ></input>
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Quantity</label>
                                            <input placeholder="Quantity" focus value={updateQuantity} onChange={(e) => setUpdateQuantity(e.target.value)} ></input>
                                        </Form.Field>
                                        <Form.Field>
                                            <Button onClick={() => {handleUpdateInventory()}} primary>
                                                <Icon name="edit"></Icon>
                                                Update
                                            </Button>
                                        </Form.Field>
                                    </Form>
                                </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns="1">
                        <Grid.Column>
                            {
                                inventoryData.length === 0 ? 
                                (<Segment padded='very'>
                                    <Header textAlign='center'>There's no data available. Please enter some.</Header>
                                </Segment>) : 
                                (<Segment padded='very'>
                                    <Header textAlign='center' >IN STORE</Header>
                                    <Table celled fixed singleLine>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>Index</Table.HeaderCell>
                                                <Table.HeaderCell>Item</Table.HeaderCell>
                                                <Table.HeaderCell>Quantity</Table.HeaderCell>
                                                <Table.HeaderCell></Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        {
                                            inventoryData.map((data,index) => {
                                                return (<Table.Body>
                                                    <Table.Cell>{data.Index}</Table.Cell>
                                                    <Table.Cell>{data.Item}</Table.Cell>
                                                    <Table.Cell>{data.Quantity}</Table.Cell>
                                                    <Table.Cell>
                                                        <Button primary onClick={() => handleUpdateClick(data)}>
                                                            <Icon name="edit"></Icon>
                                                            Update
                                                        </Button>
                                                        <Button color="red" onClick={() => {handleDelete(data.id)}}>
                                                            <Icon name="delete"></Icon>
                                                            Delete
                                                        </Button>
                                                    </Table.Cell>

                                                </Table.Body>)
                                            })
                                        }
                                    </Table>
                                </Segment>)
                            }
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </div>
    )
}

export default FirebaseCRUD;