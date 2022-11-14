from kivy.app import App
from matplotlib import pyplot as plt
from kivy.lang import Builder
import numpy as np
from kivy.garden.matplotlib import FigureCanvasKivyAgg


class GraphApp(App):

    def build(self):
        self.str = Builder.load_string(""" 

BoxLayout:
    layout:layout

    BoxLayout:

        id:layout

                                """)

        y = [3, 5, 1, 5 , 8 ,4]

        y = np.array(y)

        plt.plot(y)

        plt.xlabel('X')

        plt.ylabel('Y')
        plt.grid(True, color='lightgrey')

        self.str.layout.add_widget(FigureCanvasKivyAgg(plt.gcf()))
        return self.str


GraphApp().run()