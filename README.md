# MemoryGame

## Push
La clausula se utiliza para mandar los cambios al repositorio, se realiza con el siguiente paso a paso:

```bash
git add .
```

Este comando añade todos los cambios al commit que sera enviado

```bash
git commit -m "mensaje que deseas"
```

Esto es para colocarle un mensaje a lo que se va a enviar para diferenciarlos ( La idea es que sea algo referente al cambio, por ejemplo si se hizo cambio en los colores de index se deberia colocar index Colors)

```bash
git push
```

El ultimo comando envia todos los cambios al repositorio, si tiene problema con este ultimo punto verifique el paso a paso, busque en internet o por ultimo pregunte al team leader

## Pull y Merge
Nota: Deben tener presente que para realizar este proceso ya debieron haber hecho un Push a sus ramas, sino el comando les pedirá que lo hagan.

Primero deben cambiar de rama, para ello utilizan el comando.

```bash
git checkout "Rama a la que va dirigida"
```

Despues de cambiar de rama deben traer lo que este contenido por lo que hacen

```bash
git pull
```

Con ello traen lo que esta almacenado, vuelven a tu rama usando "Checkout". Cuando ya esten en su rama colocan

```bash
git merge "Rama a la que quieren combinar"
```