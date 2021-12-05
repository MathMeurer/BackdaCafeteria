## Rota pedidos

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


