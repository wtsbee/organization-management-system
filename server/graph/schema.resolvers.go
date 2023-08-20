package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.36

import (
	"context"
	"log"
	"math/rand"
	"my_package/graph/model"
	"my_package/graph/usecase"
	"strconv"
)

// コンストラクタ
func NewResolver(vu usecase.IVersionUsecase) *Resolver {
	return &Resolver{
		todos: []*model.Todo{},
		vu:    vu,
	}
}

// CreateTodo is the resolver for the createTodo field.
func (r *mutationResolver) CreateTodo(ctx context.Context, input model.NewTodo) (*model.Todo, error) {
	uintUserID, err := strconv.ParseUint(input.UserID, 10, 64)
	if err != nil {
		log.Println("graph CreateTodo 変換エラー:", err)
		return &model.Todo{}, err
	}
	todo := &model.Todo{
		Text: input.Text,
		ID:   uint(rand.Uint64()),
		User: &model.User{ID: uint(uintUserID), Name: "user " + input.UserID},
	}
	r.todos = append(r.todos, todo)
	return todo, nil
}

// CreateVersion is the resolver for the createVersion field.
func (r *mutationResolver) CreateVersion(ctx context.Context, input model.NewVersion) (*model.Version, error) {
	version, err := r.vu.CreateVersion(input)
	if err != nil {
		log.Println("graph CreateVersion バージョン作成エラー: ", err)
		return &model.Version{}, err
	}
	return &version, nil
}

// Todos is the resolver for the todos field.
func (r *queryResolver) Todos(ctx context.Context) ([]*model.Todo, error) {
	return r.todos, nil
}

// GetVersions is the resolver for the getVersions field.
func (r *queryResolver) GetVersions(ctx context.Context) ([]*model.Version, error) {
	return r.vu.GetVersions()
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
