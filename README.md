## Rota pedidos

* GET /pedidos

Retorna a listagem de todos os pedidos


* POST /pedidos/abrir

É necessário fornecer via json o número da mesa para qual o pedido vai ser aberto.

```json
{
	"mesa":1
}
```

* POST /pedidos/fechar

É necessário fornecer via json o número da mesa para fechar um pedido

```json
{
	"mesa":1
}
```

* POST /pedidos/adicionar

Adiciona um item ao pedido de uma mesa

É necessário fornecer via json o número da mesa e o id do item

```json
{
	"mesa":1,
	"item":1
}
```


