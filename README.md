## Build Rails API:

No escopo do diretório `./todo-back` :

`bundle install && bundle exec rake db:reset && bundle exec rails s -p 3001`

## Build React Front:
No escopo do diretório `./todo-front` :

`yarn install && yarn start`

## Execução da Rake Task:
`bundle exec rake csv:export`

## Instruções originais:

Quando um usuário **marcar** uma tarefa como completa:
* O sistema exibe para o usuário uma bela frase aleatória de "Parabéns" (invente qualquer 5 frases aleatórias) de uma cor hexadecimal aleatória dessa lista [#7B68EE, #6A5ACD, #800000, #2F4F4F].

* Além disso, também tem que enviar um evento para o sistema de tracking. Por simplicidade, o sistema de tracking é só uma tabelinha de eventos que tem um tipo de evento e um campo json em que você manda dados relevantes. No caso, guardar um tipo 'Congratulations', enquanto que e a cor e a frase aleatória de "Parabéns" são guardadas nesse campo json.

Quando um usuário **desmarca** a tarefa como completa:
* O sistema exibe para o usuário uma triste frase aleatória de "Poxa vida..." (invente qualquer 5 frases aleatórias) de uma cor hexadecimal aleatória da mesma lista [#7B68EE, #6A5ACD, #800000, #2F4F4F].

* Também marca trackeia com o tipo 'Shame' e guardando a cor e frase no campo json.

Algumas exigências dos usuários muito empolgados com o sistema:
* Usar o [Bootstrap](https://getbootstrap.com/) para o CSS
* Criar uma rake task que extrai um relatório CSV de todos os eventos com: usuário, cor hexadecimal, frase e a hora que foi marcada como completa.

Faça o código exatamente como faria no dia-a-dia de trabalho. Não precisa inventar algo para impressionar : ) Só faça com o que está confortável.
