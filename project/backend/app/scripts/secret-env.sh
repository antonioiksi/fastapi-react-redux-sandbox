#!/usr/local/bin/python


#!/usr/bin/python


import os
import binascii


f= open(".env","w+")
# secret=b'deff1952d59f883ece260e8683fed21ab0ad9a53323eca4f'
# algorithm=HS256

f.write("secret=b'%s'\n" % binascii.hexlify(os.urandom(24)))
f.write("algorithm=HS256\n")

f.close()