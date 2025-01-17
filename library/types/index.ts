import { DebugElement, SimpleChanges, Type } from '@angular/core';
import { NgtxElement } from '../entities';

export type Assignable<T> = {
  -readonly [P in keyof T]: T[P];
};

export type Fn<In, Out> = (a: In) => Out;
export type ConverterFn<Out> = Fn<any, Out>;

export interface LifeCycleHooks {
  ngOnInit?: () => void;
  ngOnChanges?: (changes: SimpleChanges) => void;
}

export type QueryTarget<Component> = string | Type<Component>;

export interface TypedDebugElement<
  Html extends Element = Element,
  Component = any,
> extends DebugElement {
  nativeElement: Html;
  componentInstance: Component;
}

export type TypeObjectMap<K> = Partial<{
  [P in keyof Partial<K>]: any;
}>;

export type Chainable<
  Html extends Element = Element,
  Component = any,
> = TypedDebugElement<Html, Component> & NgtxElement;
